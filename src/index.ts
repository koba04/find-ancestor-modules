import ts from "typescript";
import _glob from "glob";
import util from "util";
import fs from "fs";

import path from "path";
import { getImporFiles } from "./ast";
import { normalizePath } from "./util";

const glob = util.promisify(_glob);
const readFile = util.promisify(fs.readFile);

export const parse = async (
  rootDir: string,
  target: string
): Promise<string[]> => {
  const files = await parseDir(rootDir);
  const results = await Promise.all(files.map(async file => parseFile(file)));
  return parseDependencies(target, results);
};

type Deps = [string, string[]];

export const parseDependencies = (target: string, deps: Deps[]): string[] => {
  const calcDeps: string[] = [];
  const parentDeps = new Map();
  deps.forEach(([file, children]) => {
    children.forEach(child => {
      const d = parentDeps.get(child) || [];
      parentDeps.set(child, [...d, file]);
    });
  });
  // console.log(parentDeps);
  let current;
  const targets = parentDeps.get(target);
  while ((current = targets.shift())) {
    targets.push(
      ...(parentDeps.get(current) || []).filter(
        (e: string) => calcDeps.indexOf(e) === -1
      )
    );
    calcDeps.push(current);
  }
  return calcDeps;
};

// TODO: return all ts(x) files
export const parseDir = async (dir: string): Promise<string[]> => {
  return glob(dir + "/**/*.ts");
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
  return [normalizePath(filePath), getImporFiles(sourceFile)];
};
