import path from "path";

export const normalizePath = (filePath: string, baseDir = process.cwd()) => {
  return path.relative(baseDir, path.resolve(filePath));
};
