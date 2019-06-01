import ts from "typescript";

import { normalizePath } from "./util";
import { getImporFiles } from "./ast";

type DepsMap = Map<string, string[]>;

export const parseFile = (entryFiles: string[]): DepsMap => {
  const program = ts.createProgram({
    rootNames: entryFiles,
    options: {}
  });

  return new Map(
    program
      .getSourceFiles()
      .filter(sourceFile => !sourceFile.isDeclarationFile)
      .map(sourceFile => {
        return [normalizePath(sourceFile.fileName), getImporFiles(sourceFile)];
      })
  );
};
