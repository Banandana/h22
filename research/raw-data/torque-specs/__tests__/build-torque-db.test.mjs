import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import Database from "better-sqlite3";

const ROOT = join(import.meta.dirname, "..", "..", "..", "..");
const DB_DIR = join(ROOT, "research", "raw-data", "torque-specs");
const SCRIPT = join(ROOT, "scripts", "build-torque-db.mjs");
const DB_PATH = join(DB_DIR, "h22-torques.db");

// ── Helpers ────────────────────────────────────────────────────────────────

function cleanDb() {
  try {
    const db = new Database(DB_PATH);
    db.close();
  } catch { /* ignore */ }
  try {
    execSync(`rm -f "${DB_PATH}" "${DB_PATH}-wal" "${DB_PATH}-shm"`, { stdio: "ignore" });
  } catch { /* ignore */ }
}

function runBuild(extraArgs = "") {
  cleanDb();
  execSync(`node "${SCRIPT}" ${extraArgs}`, {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60000,
  });
}

function openDb() {
  return new Database(DB_PATH);
}

// ── Fixtures ───────────────────────────────────────────────────────────────

const FIXTURE_TORQUES = [
  {
    id: "BB6-p136-cylhead-headbolt",
    source: { manual: "BB6", page: 136 },
    system: "engine",
    assembly: "cylinder-head",
    fastener_name: "Cylinder head bolt",
    thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
    qty: 10,
    role: "tty-stretch",
    torque: { steps: [{ pass: 1, nm: 39, kgfm: 4, lbft: 29, angle_deg: 90 }] },
    lubrication: "dry",
    reusable: false,
    oem: true,
    confidence: "high",
    notes: "Torque in sequence",
    honda_part_number: "90005-PCB-003",
    special_tool: null,
    tty: {},
    meta: {},
    applies_to: {},
    corroboration: {
      consensus_strategy: "unanimous",
      agreeing_invocations: [
        { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0.3, response_path: "responses/bb6/136/test__r1.json" },
      ],
      disagreeing_invocations: [],
      vote_strength: 1,
      intra_model_consistency: {},
      single_source: false,
    },
    conflict_group_id: null,
  },
  {
    id: "BB6-p137-maincap-bolt",
    source: { manual: "BB6", page: 137 },
    system: "engine",
    assembly: "main-bearing-cap",
    fastener_name: "Main bearing cap bolt",
    thread: { nominal_mm: 11, pitch_mm: 1.5, length_mm: null, grade: "8.8" },
    qty: 10,
    role: "tty-stretch",
    torque: { steps: [{ pass: 1, nm: 73, kgfm: 7.4, lbft: 54, angle_deg: 90 }] },
    lubrication: "oiled",
    reusable: false,
    oem: true,
    confidence: "high",
    notes: null,
    honda_part_number: "90011-PC0-003",
    special_tool: null,
    tty: {},
    meta: {},
    applies_to: {},
    corroboration: {
      consensus_strategy: "majority-vote-torque-nm",
      agreeing_invocations: [
        { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0.3, response_path: "responses/bb6/137/test__r1.json" },
        { model_id: "together.kimi-k2-6-fp4", run: "r2", temperature: 0.3, response_path: "responses/bb6/137/test__r2.json" },
      ],
      disagreeing_invocations: [
        { model_id: "anthropic.claude-sonnet-4-6", run: "r1", temperature: 0, response_path: "responses/bb6/137/test__sonnet_r1.json", their_torque_nm: 80 },
      ],
      vote_strength: 0.667,
      intra_model_consistency: {},
      single_source: false,
    },
    conflict_group_id: null,
  },
];

const FIXTURE_ARP = [
  {
    id: "ARP-h22-headstud",
    source: { manual: "ARP", page: null },
    system: "engine",
    assembly: "cylinder-head",
    fastener_name: "ARP cylinder head stud",
    thread: { nominal_mm: 12, pitch_mm: 1.75, length_mm: null, grade: "ARP 8740" },
    qty: 10,
    role: "tty-stretch",
    torque: { steps: [{ pass: 1, nm: 122, kgfm: 12.4, lbft: 90, angle_deg: null }] },
    lubrication: "arp-ultra-torque",
    reusable: true,
    oem: false,
    confidence: "high",
    notes: "ARP 208-4304 Pro Series head stud kit",
    meta: { arp_pn: "208-4304", arp_url: "https://arp-bolts.com/kit/208-4304" },
    applies_to: {},
    corroboration: {
      consensus_strategy: "single-source",
      agreeing_invocations: [],
      disagreeing_invocations: [],
      vote_strength: 1,
      intra_model_consistency: {},
      single_source: true,
    },
    conflict_group_id: null,
  },
];

const FIXTURE_DISPUTED = [
  {
    id: "BB6-p200-disputed-bolt",
    source: { manual: "BB6", page: 200 },
    assembly: "oil-pan",
    fastener_name: "Oil pan bolt",
    thread: { nominal_mm: 8, pitch_mm: 1.25 },
    candidates: [
      { torque_nm: 10, model: "kimi" },
      { torque_nm: 12, model: "sonnet" },
    ],
    resolved: false,
  },
];

const FIXTURE_REJECTS = [
  { id: "reject-1", error: "parse failed", source: { manual: "BB6", page: 500 } },
  { id: "reject-2", error: "missing torque", source: { manual: "BB6", page: 501 } },
];

const FIXTURE_LEDGER = [
  { invocation_id: "test-r1", manual: "BB6", page: 136, model_id: "together.kimi-k2-6-fp4", run: "r1", cost_usd: 0.004 },
  { invocation_id: "test-r2", manual: "BB6", page: 137, model_id: "together.kimi-k2-6-fp4", run: "r2", cost_usd: 0.005 },
  { invocation_id: "test-sonnet", manual: "BB6", page: 137, model_id: "anthropic.claude-sonnet-4-6", run: "r1", cost_usd: 0.010 },
];

// ── Tests ──────────────────────────────────────────────────────────────────

describe("build-torque-db.mjs", () => {
  let backupFiles;

  before(() => {
    // Backup original JSONL files
    backupFiles = {
      torques: readFileSync(join(DB_DIR, "h22-torques.jsonl"), "utf8"),
      arp: readFileSync(join(DB_DIR, "h22-torques-arp.jsonl"), "utf8"),
      disputed: readFileSync(join(DB_DIR, "h22-torques-disputed.jsonl"), "utf8"),
      rejects: readFileSync(join(DB_DIR, "h22-torques-rejects.jsonl"), "utf8"),
      ledger: readFileSync(join(DB_DIR, "cost-ledger.jsonl"), "utf8"),
    };
  });

  after(() => {
    // Restore original files
    writeFileSync(join(DB_DIR, "h22-torques.jsonl"), backupFiles.torques);
    writeFileSync(join(DB_DIR, "h22-torques-arp.jsonl"), backupFiles.arp);
    writeFileSync(join(DB_DIR, "h22-torques-disputed.jsonl"), backupFiles.disputed);
    writeFileSync(join(DB_DIR, "h22-torques-rejects.jsonl"), backupFiles.rejects);
    writeFileSync(join(DB_DIR, "cost-ledger.jsonl"), backupFiles.ledger);
    cleanDb();
  });

  test("builds DB with real data and runs self-tests", () => {
    const output = execSync(`node "${SCRIPT}" --self-test`, {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 60000,
    });
    assert.ok(output.includes("All self-tests passed."), "self-tests should pass");
    assert.ok(output.includes("[PASS]"), "should have at least one PASS line");
  });

  test("creates DB file on disk", () => {
    assert.ok(existsSync(DB_PATH), "DB file should exist");
  });

  test("is idempotent — rebuild produces same structure", () => {
    runBuild();
    const db1 = openDb();
    const c1 = db1.prepare("SELECT COUNT(*) as c FROM torques").get().c;
    const a1 = db1.prepare("SELECT COUNT(*) as c FROM arp_xrefs").get().c;
    db1.close();

    runBuild();
    const db2 = openDb();
    const c2 = db2.prepare("SELECT COUNT(*) as c FROM torques").get().c;
    const a2 = db2.prepare("SELECT COUNT(*) as c FROM arp_xrefs").get().c;
    db2.close();

    assert.strictEqual(c1, c2, "torque count should be identical across rebuilds");
    assert.strictEqual(a1, a2, "ARP count should be identical across rebuilds");
  });

  test("with fixture data: correct row counts", () => {
    // Swap in fixture data
    writeFileSync(join(DB_DIR, "h22-torques.jsonl"), FIXTURE_TORQUES.map(JSON.stringify).join("\n") + "\n");
    writeFileSync(join(DB_DIR, "h22-torques-arp.jsonl"), FIXTURE_ARP.map(JSON.stringify).join("\n") + "\n");
    writeFileSync(join(DB_DIR, "h22-torques-disputed.jsonl"), FIXTURE_DISPUTED.map(JSON.stringify).join("\n") + "\n");
    writeFileSync(join(DB_DIR, "h22-torques-rejects.jsonl"), FIXTURE_REJECTS.map(JSON.stringify).join("\n") + "\n");
    writeFileSync(join(DB_DIR, "cost-ledger.jsonl"), "# Cost Ledger\n" + FIXTURE_LEDGER.map(JSON.stringify).join("\n") + "\n");

    runBuild();

    const db = openDb();

    const tqCount = db.prepare("SELECT COUNT(*) as c FROM torques").get().c;
    assert.strictEqual(tqCount, 2, "should have 2 OEM torque rows");

    const arpCount = db.prepare("SELECT COUNT(*) as c FROM arp_xrefs").get().c;
    assert.strictEqual(arpCount, 1, "should have 1 ARP xref row");

    const dpCount = db.prepare("SELECT COUNT(*) as c FROM disputes").get().c;
    assert.strictEqual(dpCount, 1, "should have 1 dispute row");

    db.close();
  });

  test("with fixture data: torque fields correctly stored", () => {
    const db = openDb();

    const row = db.prepare("SELECT * FROM torques WHERE id = ?").get("BB6-p136-cylhead-headbolt");
    assert.ok(row, "should find cylinder head bolt");
    assert.strictEqual(row.system, "engine");
    assert.strictEqual(row.assembly, "cylinder-head");
    assert.strictEqual(row.fastener_name, "Cylinder head bolt");
    assert.strictEqual(row.role, "tty-stretch");
    assert.strictEqual(row.oem, 1);
    assert.strictEqual(row.thread_nominal_mm, 10);
    assert.strictEqual(row.thread_pitch_mm, 1.25);
    assert.strictEqual(row.qty, 10);
    assert.strictEqual(row.honda_part_number, "90005-PCB-003");
    assert.strictEqual(row.lubrication, "dry");
    assert.strictEqual(row.reusable, 0);
    assert.strictEqual(row.confidence, "high");

    const torqueData = JSON.parse(row.torque_json);
    assert.strictEqual(torqueData.steps.length, 1);
    assert.strictEqual(torqueData.steps[0].nm, 39);
    assert.strictEqual(torqueData.steps[0].angle_deg, 90);

    db.close();
  });

  test("with fixture data: ARP xref fields", () => {
    const db = openDb();

    const arp = db.prepare("SELECT * FROM arp_xrefs WHERE id = ?").get("ARP-h22-headstud");
    assert.ok(arp, "should find ARP head stud");
    assert.strictEqual(arp.arp_part_number, "208-4304");
    assert.strictEqual(arp.arp_torque_nm, 122);
    assert.strictEqual(arp.oem_role, "tty-stretch");
    assert.strictEqual(arp.source_url, "https://arp-bolts.com/kit/208-4304");

    db.close();
  });

  test("with fixture data: invocation joins", () => {
    const db = openDb();

    // BB6-p136 has 1 agreeing invocation
    const joins1 = db.prepare(
      "SELECT * FROM torque_invocations WHERE torque_id = 'BB6-p136-cylhead-headbolt'"
    ).all();
    assert.strictEqual(joins1.length, 1, "cylinder head bolt should have 1 invocation join");
    assert.strictEqual(joins1[0].agreement, "agreeing");

    // BB6-p137 has 2 agreeing + 1 disagreeing
    const joins2 = db.prepare(
      "SELECT * FROM torque_invocations WHERE torque_id = 'BB6-p137-maincap-bolt'"
    ).all();
    assert.strictEqual(joins2.length, 3, "main cap bolt should have 3 invocation joins");
    const agreeCount = joins2.filter((j) => j.agreement === "agreeing").length;
    const disCount = joins2.filter((j) => j.agreement === "disagreeing").length;
    assert.strictEqual(agreeCount, 2, "2 agreeing invocations");
    assert.strictEqual(disCount, 1, "1 disagreeing invocation");

    // Disagreeing should have their_torque_nm
    const disJoin = joins2.find((j) => j.agreement === "disagreeing");
    assert.strictEqual(disJoin.their_torque_nm, 80);

    db.close();
  });

  test("with fixture data: _meta table", () => {
    const db = openDb();

    const meta = {};
    for (const row of db.prepare("SELECT key, value FROM _meta").all()) {
      meta[row.key] = row.value;
    }

    assert.strictEqual(meta.schema_version, "1");
    assert.ok(meta.built_at, "built_at should exist");
    assert.strictEqual(meta.source_jsonl_sha256?.length, 64);
    assert.strictEqual(meta.oem_torque_count, "2");
    assert.strictEqual(meta.arp_xref_count, "1");
    assert.strictEqual(meta.dispute_count, "1");
    assert.strictEqual(meta.reject_count, "2");

    db.close();
  });

  test("with fixture data: disputes table", () => {
    const db = openDb();

    const dp = db.prepare("SELECT * FROM disputes WHERE id = ?").get("BB6-p200-disputed-bolt");
    assert.ok(dp, "should find disputed bolt");
    assert.strictEqual(dp.resolved, 0);
    const candidates = JSON.parse(dp.candidates_json);
    assert.strictEqual(candidates.length, 2);
    assert.strictEqual(candidates[0].torque_nm, 10);
    assert.strictEqual(candidates[1].torque_nm, 12);

    db.close();
  });

  test("with fixture data: FTS5 search works", () => {
    const db = openDb();

    // Should find results for common terms
    const torqueResults = db.prepare(
      "SELECT COUNT(*) as c FROM markdown_fts WHERE markdown_fts MATCH 'torque'"
    ).get().c;
    assert.ok(torqueResults > 0, "FTS5 should find 'torque' results");

    const boltResults = db.prepare(
      "SELECT COUNT(*) as c FROM markdown_fts WHERE markdown_fts MATCH 'bolt'"
    ).get().c;
    assert.ok(boltResults > 0, "FTS5 should find 'bolt' results");

    db.close();
  });

  test("with fixture data: chapters and pages", () => {
    const db = openDb();

    const chCount = db.prepare("SELECT COUNT(*) as c FROM chapters").get().c;
    assert.ok(chCount > 0, "should have chapters");

    const pgCount = db.prepare("SELECT COUNT(*) as c FROM pages").get().c;
    assert.ok(pgCount > 0, "should have pages");

    // Check chapter-page FK relationship
    const chPages = db.prepare(
      "SELECT COUNT(*) as c FROM pages WHERE chapter_id = 'bb6.engine-electrical'"
    ).get().c;
    assert.ok(chPages > 0, "should have pages under bb6.engine-electrical");

    db.close();
  });

  test("with fixture data: all indexes exist", () => {
    const db = openDb();

    const indexes = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%'"
    ).all().map((i) => i.name);

    const expected = [
      "idx_torques_assembly",
      "idx_torques_role_thread",
      "idx_torques_manual_page",
      "idx_invocations_model",
      "idx_invocations_page",
    ];
    for (const exp of expected) {
      assert.ok(indexes.includes(exp), `index ${exp} should exist`);
    }

    db.close();
  });

  test("with fixture data: no foreign key violations", () => {
    const db = openDb();
    db.pragma("foreign_keys = ON");
    const fkErrors = db.prepare("PRAGMA foreign_key_check").all();
    assert.strictEqual(fkErrors.length, 0, "no FK violations");
    db.close();
  });

  test("with fixture data: invocations table populated", () => {
    const db = openDb();

    const invCount = db.prepare("SELECT COUNT(*) as c FROM invocations").get().c;
    assert.ok(invCount > 0, "should have invocations");

    // Verify an invocation record
    const inv = db.prepare("SELECT * FROM invocations WHERE model_id = ? LIMIT 1").get("together.kimi-k2-6-fp4");
    assert.ok(inv, "should find together.kimi-k2-6-fp4 invocation");
    assert.strictEqual(inv.provider, "together");
    assert.strictEqual(inv.run, "r1");
    assert.strictEqual(inv.temperature, 0.3);
    assert.strictEqual(inv.parse_ok, 1);

    db.close();
  });

  test("with fixture data: torque by fastener FTS search", () => {
    const db = openDb();

    const results = db.prepare(
      "SELECT view, section FROM markdown_fts WHERE view = 'by-fastener' AND markdown_fts MATCH 'flywheel'"
    ).all();
    // May or may not have flywheel depending on actual markdown content
    // Just verify the query doesn't error
    assert.ok(Array.isArray(results), "FTS5 by-fastener query should return array");

    db.close();
  });

  test("with fixture data: _meta counts match source", () => {
    const db = openDb();

    const meta = {};
    for (const row of db.prepare("SELECT key, value FROM _meta").all()) {
      meta[row.key] = row.value;
    }

    assert.strictEqual(meta.oem_torque_count, "2");
    assert.strictEqual(meta.arp_xref_count, "1");
    assert.strictEqual(meta.chapter_count, String(db.prepare("SELECT COUNT(*) as c FROM chapters").get().c));

    db.close();
  });
});
