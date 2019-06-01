import ts from "typescript";
import path from "path";

import { normalizePath } from "./util";

export const getImporFiles = (sourceFile: ts.SourceFile): string[] => {
  const importPaths: string[] = [];
  ts.forEachChild(sourceFile, node => {
    if (ts.isImportDeclaration(node)) {
      node.forEachChild((child: ts.Node) => {
        if (ts.isStringLiteral(child)) {
          // TODO: should deternime the extension by parsing results.
          importPaths.push(
            normalizePath(
              path.join(path.dirname(sourceFile.fileName), `${child.text}.ts`)
            )
          );
        }
      });
    }
  });
  return importPaths;
};
