#!/usr/bin/env node
const { parseFile } = require("../lib/index");

(async () => {
  const depsMap = await parseFile(process.argv[2]);
  depsMap.forEach((deps, filePath) => {
    console.log(filePath, deps);
  });
})();
