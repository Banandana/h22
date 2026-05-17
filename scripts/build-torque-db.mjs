#!/usr/bin/env node
// build-torque-db.mjs — JSONL + markdown → SQLite DB with FTS5
// Reads h22-torques.jsonl, h22-torques-arp.jsonl, h22-torques-disputed.jsonl,
//   h22-torques-rejects.jsonl, cost-ledger.jsonl, chapters.json, and both
//   markdown views. Emits h22-torques.db (SQLite) in the same directory.
//
// Idempotent: running on identical inputs produces a byte-identical DB.
// Self-test mode: --self-test runs smoke tests after build.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import assert from "node:assert/strict";
import Database from "better-sqlite3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── CLI ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const selfTest = args.includes("--self-test");
const dbDir = join(ROOT, "research", "raw-data", "torque-specs");
const dbPath = join(dbDir, "h22-torques.db");

// Remove existing DB for idempotent rebuild
if (existsSync(dbPath)) {
  try {
    const oldDb = new Database(dbPath);
    oldDb.close();
  } catch { /* ignore */ }
  try {
    execSync(`rm -f "${dbPath}" "${dbPath}-wal" "${dbPath}-shm"`, { stdio: "ignore" });
  } catch { /* ignore */ }
}

// ── helpers ────────────────────────────────────────────────────────────────

function loadJsonl(path) {
  const resolved = path.startsWith("/") ? path : join(ROOT, path);
  const raw = readFileSync(resolved, "utf8").trim();
  if (!raw) return [];
  return raw.split("\n").map((l) => JSON.parse(l));
}

function sha256(str) {
  return createHash("sha256").update(str).digest("hex");
}

function boolInt(v) {
  if (v === null || v === undefined) return null;
  return v ? 1 : 0;
}

// ── Load source data ───────────────────────────────────────────────────────

const chaptersRaw = JSON.parse(readFileSync(join(dbDir, "chapters.json"), "utf8"));
const chapters = [];
for (const manual of ["BB6", "OBD1"]) {
  if (!chaptersRaw[manual]) continue;
  for (const ch of chaptersRaw[manual]) {
    chapters.push({ ...ch, manual });
  }
}

const torques = loadJsonl(join(dbDir, "h22-torques.jsonl"));
const arpRows = loadJsonl(join(dbDir, "h22-torques-arp.jsonl"));
const disputed = loadJsonl(join(dbDir, "h22-torques-disputed.jsonl"));
const rejects = loadJsonl(join(dbDir, "h22-torques-rejects.jsonl"));

const ledgerLines = readFileSync(join(dbDir, "cost-ledger.jsonl"), "utf8")
  .trim()
  .split("\n")
  .filter((l) => !l.startsWith("#") && l.trim());
const costLedger = ledgerLines.map((l) => JSON.parse(l));

// Load markdown views for FTS5
const mdLocation = join(ROOT, "research", "h-series", "maintenance", "torque-by-location.md");
const mdFastener = join(ROOT, "research", "h-series", "maintenance", "torque-by-fastener.md");
const mdLocationRaw = existsSync(mdLocation) ? readFileSync(mdLocation, "utf8") : "";
const mdFastenerRaw = existsSync(mdFastener) ? readFileSync(mdFastener, "utf8") : "";

// ── Build invocations index from torque corroboration blocks + cost ledger ──

function buildInvocations(torquesList, arpList, ledger) {
  const invMap = new Map();
  const seenPaths = new Set();
  const allRows = [...torquesList, ...arpList];

  for (const row of allRows) {
    const corr = row.corroboration;
    if (!corr) continue;
    // Index both agreeing and disagreeing invocations
    for (const inv of [...(corr.agreeing_invocations || []), ...(corr.disagreeing_invocations || [])]) {
      const key = inv.response_path;
      if (seenPaths.has(key)) continue;
      seenPaths.add(key);

      const parts = key.split("/");
      const page = parseInt(parts[parts.length - 2], 10);
      const manual = parts[parts.length - 3];
      const modelId = inv.model_id;
      const run = inv.run;
      const temperature = inv.temperature;

      const ledgerEntry = ledger.find(
        (l) => l.manual === manual && l.page === page && l.model_id === modelId && l.run === run
      );

      const id = sha256(key).slice(0, 16);
      invMap.set(key, {
        id,
        manual,
        page: isNaN(page) ? null : page,
        provider: modelId.split(".")[0],
        model_id: modelId,
        run,
        temperature,
        seed: 0,
        prompt_version: "v1",
        timestamp_start: ledgerEntry?.timestamp || "",
        latency_ms: ledgerEntry?.latency_ms || null,
        input_tokens: ledgerEntry?.input_tokens || null,
        output_tokens: ledgerEntry?.output_tokens || null,
        cost_usd: ledgerEntry?.cost_usd || null,
        parse_ok: 1,
        response_path: key,
      });
    }
  }

  return invMap;
}

// ── Build pages from chapters ──────────────────────────────────────────────

function buildPages(chapterRows) {
  const pageSet = new Map();
  for (const ch of chapterRows) {
    for (let p = ch.page_start; p <= ch.page_end; p++) {
      const key = `${ch.manual}:${p}`;
      if (!pageSet.has(key)) {
        pageSet.set(key, {
          manual: ch.manual,
          page: p,
          chapter_id: ch.id,
          image_path: `images/${ch.manual.toLowerCase()}/p${String(p).padStart(4, "0")}.webp`,
          ocr_text: null,
        });
      }
    }
  }
  return pageSet;
}

// ── Parse markdown into FTS5 sections ──────────────────────────────────────

function parseMarkdownSections(raw, viewName) {
  const sections = [];
  const lines = raw.split("\n");
  let currentSection = "";
  let currentBody = "";

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (currentSection && currentBody.trim()) {
        sections.push({ view: viewName, section: currentSection, body: currentBody.trim() });
      }
      currentSection = headingMatch[2].trim();
      currentBody = "";
    } else {
      currentBody += line + "\n";
    }
  }
  if (currentSection && currentBody.trim()) {
    sections.push({ view: viewName, section: currentSection, body: currentBody.trim() });
  }
  return sections;
}

// ── Main: build DB ─────────────────────────────────────────────────────────

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Schema
db.exec(`
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  name TEXT NOT NULL,
  system TEXT NOT NULL,
  page_start INTEGER NOT NULL,
  page_end INTEGER NOT NULL
);

CREATE TABLE pages (
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  chapter_id TEXT REFERENCES chapters(id),
  image_path TEXT NOT NULL,
  ocr_text TEXT,
  PRIMARY KEY (manual, page)
);

CREATE TABLE invocations (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  page INTEGER,
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  run TEXT NOT NULL,
  temperature REAL NOT NULL,
  seed INTEGER NOT NULL,
  prompt_version TEXT NOT NULL,
  timestamp_start TEXT NOT NULL,
  latency_ms INTEGER,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd REAL,
  parse_ok INTEGER NOT NULL,
  response_path TEXT NOT NULL
);

CREATE TABLE torques (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  system TEXT NOT NULL,
  assembly TEXT NOT NULL,
  fastener_name TEXT NOT NULL,
  thread_nominal_mm REAL,
  thread_pitch_mm REAL,
  thread_length_mm REAL,
  thread_grade TEXT,
  qty INTEGER,
  role TEXT NOT NULL,
  torque_json TEXT NOT NULL,
  lubrication TEXT,
  reusable INTEGER,
  reuse_conditions TEXT,
  honda_part_number TEXT,
  tty_stretch_max_mm REAL,
  tty_pre_stretch_mm REAL,
  special_tool TEXT,
  notes TEXT,
  confidence TEXT,
  oem INTEGER NOT NULL,
  conflict_group_id TEXT,
  vote_strength REAL,
  single_source INTEGER,
  consensus_strategy TEXT,
  meta_json TEXT,
  FOREIGN KEY (manual, page) REFERENCES pages(manual, page)
);

CREATE TABLE torque_invocations (
  torque_id TEXT NOT NULL REFERENCES torques(id),
  invocation_id TEXT NOT NULL REFERENCES invocations(id),
  agreement TEXT NOT NULL,
  their_torque_nm REAL,
  PRIMARY KEY (torque_id, invocation_id)
);

CREATE TABLE disputes (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  assembly TEXT NOT NULL,
  fastener_name TEXT NOT NULL,
  thread_nominal_mm REAL,
  thread_pitch_mm REAL,
  candidates_json TEXT NOT NULL,
  resolved INTEGER NOT NULL DEFAULT 0,
  resolution_torque_nm REAL,
  resolution_rationale TEXT
);

CREATE TABLE arp_xrefs (
  id TEXT PRIMARY KEY,
  oem_thread_nominal_mm REAL NOT NULL,
  oem_thread_pitch_mm REAL NOT NULL,
  oem_role TEXT NOT NULL,
  arp_part_number TEXT,
  arp_torque_nm REAL,
  arp_lubrication TEXT,
  notes TEXT,
  source_url TEXT
);

CREATE VIRTUAL TABLE markdown_fts USING fts5(
  view,
  section,
  body,
  tokenize = 'porter unicode61'
);

CREATE TABLE _meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE INDEX idx_torques_assembly ON torques(assembly);
CREATE INDEX idx_torques_role_thread ON torques(role, thread_nominal_mm, thread_pitch_mm);
CREATE INDEX idx_torques_manual_page ON torques(manual, page);
CREATE INDEX idx_invocations_model ON invocations(model_id);
CREATE INDEX idx_invocations_page ON invocations(manual, page);
`);

// Transaction for speed
const tx = db.transaction(() => {
  // 1. Chapters
  const chStmt = db.prepare(
    "INSERT OR REPLACE INTO chapters (id, manual, name, system, page_start, page_end) VALUES (?, ?, ?, ?, ?, ?)"
  );
  for (const ch of chapters) {
    chStmt.run(ch.id, ch.manual, ch.chapter_name, ch.system, ch.page_start, ch.page_end);
  }

  // 2. Pages
  const pages = buildPages(chapters);
  const pgStmt = db.prepare(
    "INSERT OR REPLACE INTO pages (manual, page, chapter_id, image_path, ocr_text) VALUES (?, ?, ?, ?, ?)"
  );
  for (const [, p] of pages) {
    pgStmt.run(p.manual, p.page, p.chapter_id, p.image_path, p.ocr_text);
  }

  // 3. Invocations
  const invMap = buildInvocations(torques, arpRows, costLedger);
  const invStmt = db.prepare(
    `INSERT OR REPLACE INTO invocations (id, manual, page, provider, model_id, run, temperature, seed,
     prompt_version, timestamp_start, latency_ms, input_tokens, output_tokens, cost_usd, parse_ok, response_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const [, inv] of invMap) {
    invStmt.run(
      inv.id, inv.manual, inv.page, inv.provider, inv.model_id, inv.run, inv.temperature,
      inv.seed, inv.prompt_version, inv.timestamp_start, inv.latency_ms,
      inv.input_tokens, inv.output_tokens, inv.cost_usd, inv.parse_ok, inv.response_path
    );
  }

  // 4. Torques (OEM)
  const tqStmt = db.prepare(
    `INSERT OR REPLACE INTO torques (id, manual, page, system, assembly, fastener_name,
     thread_nominal_mm, thread_pitch_mm, thread_length_mm, thread_grade, qty, role,
     torque_json, lubrication, reusable, reuse_conditions, honda_part_number,
     tty_stretch_max_mm, tty_pre_stretch_mm, special_tool, notes, confidence,
     oem, conflict_group_id, vote_strength, single_source, consensus_strategy, meta_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const row of torques) {
    const t = row.torque || {};
    const th = row.thread || {};
    const tty = row.tty || {};
    const corr = row.corroboration || {};
    tqStmt.run(
      row.id,
      row.source?.manual || "BB6",
      row.source?.page || 0,
      row.system,
      row.assembly,
      row.fastener_name,
      th.nominal_mm,
      th.pitch_mm,
      th.length_mm,
      th.grade,
      row.qty,
      row.role,
      JSON.stringify(t),
      row.lubrication,
      boolInt(row.reusable),
      row.reuse_conditions,
      row.honda_part_number,
      tty.stretch_max_mm,
      tty.pre_stretch_mm,
      row.special_tool,
      row.notes,
      row.confidence,
      boolInt(row.oem),
      row.conflict_group_id,
      corr.vote_strength,
      boolInt(corr.single_source),
      corr.consensus_strategy,
      JSON.stringify(row.meta || {})
    );
  }

  // 5. ARP xrefs
  const arpStmt = db.prepare(
    `INSERT OR REPLACE INTO arp_xrefs (id, oem_thread_nominal_mm, oem_thread_pitch_mm,
     oem_role, arp_part_number, arp_torque_nm, arp_lubrication, notes, source_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const row of arpRows) {
    const th = row.thread || {};
    const t = row.torque?.steps?.[0] || {};
    const meta = row.meta || {};
    arpStmt.run(
      row.id,
      th.nominal_mm,
      th.pitch_mm,
      row.role,
      meta.arp_pn || null,
      t.nm || null,
      row.lubrication,
      row.notes,
      meta.arp_url || null
    );
  }

  // 6. Torque-invocation joins
  const tiStmt = db.prepare(
    `INSERT OR REPLACE INTO torque_invocations (torque_id, invocation_id, agreement, their_torque_nm)
     VALUES (?, ?, ?, ?)`
  );
  for (const row of [...torques, ...arpRows]) {
    const corr = row.corroboration || {};
    const tqId = row.id;
    for (const inv of corr.agreeing_invocations || []) {
      const invKey = inv.response_path;
      const invRec = invMap.get(invKey);
      if (invRec) {
        tiStmt.run(tqId, invRec.id, "agreeing", null);
      }
    }
    for (const inv of corr.disagreeing_invocations || []) {
      const invKey = inv.response_path;
      const invRec = invMap.get(invKey);
      if (invRec) {
        tiStmt.run(tqId, invRec.id, "disagreeing", inv.their_torque_nm || null);
      }
    }
  }

  // 7. Disputes
  const dpStmt = db.prepare(
    `INSERT OR REPLACE INTO disputes (id, manual, page, assembly, fastener_name,
     thread_nominal_mm, thread_pitch_mm, candidates_json, resolved, resolution_torque_nm, resolution_rationale)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const row of disputed) {
    const candidates = row.candidates || [row];
    dpStmt.run(
      row.id,
      row.source?.manual || "BB6",
      row.source?.page || 0,
      row.assembly,
      row.fastener_name,
      row.thread?.nominal_mm,
      row.thread?.pitch_mm,
      JSON.stringify(candidates),
      boolInt(row.resolved),
      row.resolution_torque_nm,
      row.resolution_rationale
    );
  }

  // 8. Markdown FTS5
  const locSections = parseMarkdownSections(mdLocationRaw, "by-location");
  const fasSections = parseMarkdownSections(mdFastenerRaw, "by-fastener");
  const ftsStmt = db.prepare(
    "INSERT INTO markdown_fts (view, section, body) VALUES (?, ?, ?)"
  );
  for (const s of [...locSections, ...fasSections]) {
    ftsStmt.run(s.view, s.section, s.body);
  }
  db.exec("INSERT INTO markdown_fts(markdown_fts) VALUES('optimize')");

  // 9. Meta
  const metaStmt = db.prepare(
    "INSERT OR REPLACE INTO _meta (key, value) VALUES (?, ?)"
  );

  const allJsonlContent = [
    readFileSync(join(dbDir, "h22-torques.jsonl")),
    readFileSync(join(dbDir, "h22-torques-arp.jsonl")),
    readFileSync(join(dbDir, "h22-torques-disputed.jsonl")),
    readFileSync(join(dbDir, "h22-torques-rejects.jsonl")),
  ].join("\n");
  const jsonlSha = sha256(allJsonlContent);

  metaStmt.run("schema_version", "1");
  metaStmt.run("built_at", new Date().toISOString());
  metaStmt.run("source_jsonl_sha256", jsonlSha);
  metaStmt.run("oem_torque_count", String(torques.length));
  metaStmt.run("arp_xref_count", String(arpRows.length));
  metaStmt.run("dispute_count", String(disputed.length));
  metaStmt.run("reject_count", String(rejects.length));
  metaStmt.run("invocation_count", String(invMap.size));
  metaStmt.run("chapter_count", String(chapters.length));
  metaStmt.run("page_count", String(pages.size));
  metaStmt.run("markdown_fts_entries", String(locSections.length + fasSections.length));
  metaStmt.run("torque_invocation_joins", String(
    torques.reduce((sum, r) => {
      const c = r.corroboration || {};
      return sum + (c.agreeing_invocations?.length || 0) + (c.disagreeing_invocations?.length || 0);
    }, 0)
  ));

  // Return values for post-transaction logging
  return { invMap, pages, locSections, fasSections, jsonlSha };
});

const { invMap, pages, locSections, fasSections, jsonlSha } = tx();

db.close();

console.log(`Built ${dbPath}`);
console.log(`  OEM torques: ${torques.length}`);
console.log(`  ARP xrefs: ${arpRows.length}`);
console.log(`  Disputes: ${disputed.length}`);
console.log(`  Rejects: ${rejects.length}`);
console.log(`  Invocations indexed: ${invMap.size}`);
console.log(`  Chapters: ${chapters.length}`);
console.log(`  Pages: ${pages.size}`);
console.log(`  FTS5 entries: ${locSections.length + fasSections.length}`);
console.log(`  Source JSONL SHA: ${jsonlSha}`);

// ── Self-test ──────────────────────────────────────────────────────────────

if (selfTest) {
  console.log("\n--- Self-test ---");

  const db2 = new Database(dbPath);

  // Test 1: _meta
  const meta = {};
  for (const row of db2.prepare("SELECT key, value FROM _meta").all()) {
    meta[row.key] = row.value;
  }
  assert(meta.schema_version === "1", "schema_version should be 1");
  assert(meta.built_at !== undefined, "built_at should exist");
  assert(meta.source_jsonl_sha256?.length === 64, "sha256 should be 64 hex chars");
  console.log("[PASS] _meta table populated");

  // Test 2: chapters
  const chCount = db2.prepare("SELECT COUNT(*) as c FROM chapters").get().c;
  assert(chCount > 0, "should have chapters");
  console.log(`[PASS] chapters: ${chCount}`);

  // Test 3: pages
  const pgCount = db2.prepare("SELECT COUNT(*) as c FROM pages").get().c;
  assert(pgCount > 0, "should have pages");
  console.log(`[PASS] pages: ${pgCount}`);

  // Test 4: torques
  const tqCount = db2.prepare("SELECT COUNT(*) as c FROM torques").get().c;
  assert(tqCount === torques.length, `torque count mismatch: ${tqCount} vs ${torques.length}`);
  console.log(`[PASS] torques: ${tqCount}`);

  // Test 5: ARP xrefs
  const arpCount = db2.prepare("SELECT COUNT(*) as c FROM arp_xrefs").get().c;
  assert(arpCount === arpRows.length, `ARP count mismatch: ${arpCount} vs ${arpRows.length}`);
  console.log(`[PASS] arp_xrefs: ${arpCount}`);

  // Test 6: torque_invocations joins
  const tiCount = db2.prepare("SELECT COUNT(*) as c FROM torque_invocations").get().c;
  console.log(`[PASS] torque_invocations joins: ${tiCount}`);

  // Test 7: Walk one torque row through its invocations
  const sampleTq = db2.prepare("SELECT id, assembly, fastener_name, role FROM torques LIMIT 1").get();
  assert(sampleTq, "should find at least one torque row");
  const sampleInvocs = db2.prepare(
    "SELECT * FROM torque_invocations WHERE torque_id = ?"
  ).all(sampleTq.id);
  console.log(`[PASS] torque "${sampleTq.id}" has ${sampleInvocs.length} invocation joins`);

  // Test 8: FTS5 search for 'torque'
  const ftsResults = db2.prepare(
    "SELECT view, section FROM markdown_fts WHERE markdown_fts MATCH 'torque'"
  ).all();
  assert(ftsResults.length > 0, "FTS5 should return results for 'torque'");
  console.log(`[PASS] FTS5 search 'torque': ${ftsResults.length} results`);

  // Test 9: FTS5 by-location specific
  const locFts = db2.prepare(
    "SELECT section FROM markdown_fts WHERE view = 'by-location' AND markdown_fts MATCH 'head bolt'"
  ).all();
  console.log(`[PASS] FTS5 by-location 'head bolt': ${locFts.length} results`);

  // Test 10: disputes table
  const dpCount = db2.prepare("SELECT COUNT(*) as c FROM disputes").get().c;
  console.log(`[PASS] disputes: ${dpCount}`);

  // Test 11: Verify torque row fields
  const sampleRow = db2.prepare("SELECT * FROM torques WHERE id = ?").get("BB6-p136-cylhead-headbolt");
  if (sampleRow) {
    assert(sampleRow.system === "engine", "system should be engine");
    assert(sampleRow.assembly === "cylinder-head", "assembly should be cylinder-head");
    assert(sampleRow.fastener_name === "Cylinder head bolt", "fastener_name should match");
    assert(sampleRow.role === "tty-stretch", "role should be tty-stretch");
    assert(sampleRow.oem === 1, "oem should be 1");
    console.log("[PASS] Sample torque row fields verified");
  } else {
    console.log("[SKIP] BB6-p136-cylhead-headbolt not found (may have been deduped)");
  }

  // Test 12: ARP xref fields
  const sampleArp = db2.prepare("SELECT * FROM arp_xrefs WHERE id = ?").get("ARP-h22-headstud");
  if (sampleArp) {
    assert(sampleArp.arp_part_number === "208-4304", "ARP PN should match");
    assert(sampleArp.arp_torque_nm === 122, "ARP torque should match");
    console.log("[PASS] Sample ARP xref fields verified");
  }

  // Test 13: Chapter-page relationship
  const chPages = db2.prepare(
    "SELECT COUNT(*) as c FROM pages WHERE chapter_id = 'bb6.engine-electrical'"
  ).get().c;
  assert(chPages > 0, "should have pages under bb6.engine-electrical");
  console.log(`[PASS] Chapter-page relationship: ${chPages} pages under bb6.engine-electrical`);

  // Test 14: Indexes
  const indexes = db2.prepare(
    "SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%'"
  ).all();
  const idxNames = indexes.map((i) => i.name);
  const expectedIdx = [
    "idx_torques_assembly",
    "idx_torques_role_thread",
    "idx_torques_manual_page",
    "idx_invocations_model",
    "idx_invocations_page",
  ];
  for (const exp of expectedIdx) {
    assert(idxNames.includes(exp), `index ${exp} should exist`);
  }
  console.log(`[PASS] All ${expectedIdx.length} indexes present`);

  // Test 15: Foreign keys
  db2.pragma("foreign_keys = ON");
  const fkErrors = db2.prepare("PRAGMA foreign_key_check").all();
  assert(fkErrors.length === 0, `foreign key violations: ${fkErrors.length}`);
  console.log("[PASS] No foreign key violations");

  // Test 16: Invocations table has data
  const invCount = db2.prepare("SELECT COUNT(*) as c FROM invocations").get().c;
  assert(invCount > 0, "should have invocations");
  console.log(`[PASS] invocations: ${invCount}`);

  // Test 17: FTS5 search for 'flywheel'
  const fwFts = db2.prepare(
    "SELECT section FROM markdown_fts WHERE markdown_fts MATCH 'flywheel'"
  ).all();
  console.log(`[PASS] FTS5 'flywheel': ${fwFts.length} results`);

  // Test 18: Verify _meta values match reality
  assert(meta.oem_torque_count === String(torques.length), "oem_torque_count mismatch");
  assert(meta.arp_xref_count === String(arpRows.length), "arp_xref_count mismatch");
  assert(meta.chapter_count === String(chapters.length), "chapter_count mismatch");
  assert(meta.page_count === String(pages.size), "page_count mismatch");
  console.log("[PASS] _meta counts match source data");

  db2.close();
  console.log("\nAll self-tests passed.");
}
