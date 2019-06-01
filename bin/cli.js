const { parseFile } = require("../lib/index");

const depsMap = parseFile([process.argv[2]]);
depsMap.forEach((deps, filePath) => {
  console.log(filePath, deps);
});
