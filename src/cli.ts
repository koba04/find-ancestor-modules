import meow from "meow";
import { parse } from "./index";

export async function run() {
  const cli = meow(
    `
        Usage
          $ find-ancestor-modules
        Options
          --root A root directory of a project
          --target A target file
      `,
    {
      flags: {
        root: {
          type: "string"
        },
        target: {
          type: "string"
        }
      }
    }
  );
  const { root, target } = cli.flags;
  const depsMap = await parse(root, target);
  depsMap.forEach(dep => {
    console.log(dep);
  });
}
