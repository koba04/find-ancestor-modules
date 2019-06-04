import ts from "typescript";
import _glob from "glob";
import util from "util";
import fs from "fs";

import path from "path";
import { getImporFiles } from "./ast";
import { normalizePath } from "../lib/util";

const glob = util.promisify(_glob);
const readFile = util.promisify(fs.readFile);

export const parse = async (
  rootDir: string,
  target: string
): Promise<string[]> => {
  console.log(target, path.resolve(rootDir));
  const files = await parseDir(path.resolve(rootDir) + "/**/*.ts");
  const results = await Promise.all(files.map(async file => parseFile(file)));
  const depsMap = new Map();
  results.forEach(([filePath, imports]) => {
    imports.forEach(i => {
      const deps = depsMap.get(i) || [];
      depsMap.set(i, [...deps, normalizePath(filePath)]);
    });
  });
  return depsMap.get(target);
};

// TODO: return all ts(x) files
export const parseDir = async (dir: string): Promise<string[]> => {
  return glob(dir);
};

export const parseFile = async (
  filePath: string
): Promise<[string, string[]]> => {
  const source = await readFile(filePath);
  const sourceFile = ts.createSourceFile(
    filePath,
    source.toString(),
    // TODO
    ts.ScriptTarget.Latest
  );
  return [filePath, getImporFiles(sourceFile)];
};
