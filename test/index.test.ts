import assert from "assert";
import { parseFile, parseDependencies } from "../src/index";

describe("index", () => {
  describe("parseFile", () => {
    it("should return a dependency Map", async () => {
      const results = await parseFile("./fixture/index.ts");
      assert.deepStrictEqual(results, [
        "fixture/index.ts",
        ["fixture/sum.ts", "fixture/foo/bar.ts"]
      ]);
    });
  });
  describe("parseDependencies", () => {
    it("should return all ancestor modules", () => {
      assert.deepStrictEqual(
        parseDependencies("hoge.ts", [
          ["index.ts", ["foo.ts", "bar.ts"]],
          ["foo.ts", ["baz.ts"]],
          ["bar.ts", ["hoge.ts", "other.ts"]]
        ]),
        ["bar.ts", "index.ts"]
      );
    });
  });
});
