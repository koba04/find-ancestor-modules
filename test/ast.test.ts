import assert from "assert";
import fs from "fs";
import ts from "typescript";
import { getImporFiles } from "../src/ast";

describe("ast", () => {
  describe("getImportFiles", () => {
    it("should return filePaths that depends on a passed file", () => {
      const sourceFile = ts.createSourceFile(
        "./fixture/index.ts",
        fs.readFileSync("./fixture/index.ts").toString(),
        ts.ScriptTarget.Latest
      );
      assert.deepStrictEqual(getImporFiles(sourceFile), [
        "fixture/sum.ts",
        "fixture/foo/bar.ts"
      ]);
    });
  });
});
