import { runAudit } from "../lib/audit";

test("invalid url fails", async () => {
  await expect(runAudit({ url: "not-a-url" })).rejects.toThrow();
});

test("html-only fallback works with unreachable URL", async () => {
  const url = "https://example.invalid.domain";
  await expect(runAudit({ url })).resolves.toHaveProperty("url", url);
});
