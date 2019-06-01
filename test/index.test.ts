import assert from "assert";
import { parseFile } from "../src/index";

describe("index", () => {
  describe("parseFile", () => {
    it("should return a dependency Map", () => {
      const result = parseFile(["./fixture/index.ts"]);
      assert(result instanceof Map);
      assert.deepStrictEqual(result.get("fixture/index.ts"), [
        "fixture/sum.ts",
        "fixture/foo/bar.ts"
      ]);
      assert.deepStrictEqual(result.get("fixture/sum.ts"), []);
      assert.deepStrictEqual(result.get("fixture/foo/bar.ts"), [
        "fixture/foo/baz.ts"
      ]);
    });
  });
});
