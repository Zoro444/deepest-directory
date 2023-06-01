import fs from "fs";
import path from "path";

async function getDeepestDir() {
  let currentDeep = 0;
  let deep = 1;
  let deepFile = {};

  async function getDeep(currentDeep, currentDirectory) {
    try {
      const stats = await fs.promises.stat(currentDirectory);
      if (stats.isDirectory()) {
        const data = await fs.promises.readdir(currentDirectory);
        if (data.length === 0) {
          currentDeep++;
          deep = currentDeep;
          deepFile.deep = deep;
          deepFile.filePath = currentDirectory;
          currentDeep--;
        }

        for (const dir of data) {
          currentDeep++;
          if (currentDeep >= deep && data.length > 0) {
            deep = currentDeep;
            deepFile.deep = deep;
            deepFile.filePath = currentDirectory;
          }
          await getDeep(currentDeep, path.join(currentDirectory, dir));
          currentDeep--;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  await getDeep(currentDeep, path.resolve('node_modules'));
  return deepFile;
}
getDeepestDir()
  .then((result) => {
    return fs.promises.writeFile(path.join(result.filePath, 'test.txt'), 'Hello World!');
  })
  .then(() => {
    console.log('File created successfully!');
  })
  .catch((error) => {
    console.error(error);
  });
