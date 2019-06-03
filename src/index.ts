import ts from "typescript";
import _glob from "glob";
import util from "util";
import fs from "fs";

import { getImporFiles } from "./ast";

const glob = util.promisify(_glob);
const readFile = util.promisify(fs.readFile);

// TODO: return all ts(x) files
export const parseDir = async (dir: string): Promise<string[]> => {
  return await glob(dir);
};

export const parseFile = async (filePath: string): Promise<string[]> => {
  const source = await readFile(filePath);
  const sourceFile = ts.createSourceFile(
    filePath,
    source.toString(),
    // TODO
    ts.ScriptTarget.Latest
  );
  return getImporFiles(sourceFile);
};
