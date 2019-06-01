import assert from "assert";
import { normalizePath } from "../src/util";

describe("util", () => {
  describe("normalizePath", () => {
    it("should return a relative path from a current directory", () => {
      assert.strictEqual(normalizePath("src/foo.ts"), "src/foo.ts");
    });
    it("should return a relative path from a passing directory", () => {
      assert.strictEqual(normalizePath("src/foo.ts", "src"), "foo.ts");
    });
  });
});
