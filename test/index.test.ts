import assert from "assert";
import { parseFile } from "../src/index";

describe("index", () => {
  describe("parseFile", () => {
    it("should return a dependency Map", async () => {
      const results = await parseFile("./fixture/index.ts");
      assert.deepStrictEqual(results, ["fixture/sum.ts", "fixture/foo/bar.ts"]);
    });
  });
});
