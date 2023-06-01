import fs from "fs";

async function getDeepestDir() {
  let currentDeep = 0;
  let deep = 1;
  let deepFile = {};

  async function getDeep(currentDeep, currentDirectory) {
          fs.stat(currentDirectory, async (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
        
            if (stats.isDirectory()) {
            fs.readdir(currentDirectory, (err, data) => {          
                if (err) {
                  console.log('err',err);
                }
            
                else {
                  if (data.length === 0) {
                    currentDeep++;
                    deep = currentDeep;
                    deepFile.deep = deep;
                    deepFile.filePath = currentDirectory;
                    console.log(deepFile);
                    currentDeep--;
                  }
                                        
                  data.forEach((dir) => {                                          
                    currentDeep++;
                    if (currentDeep >= deep && data.length > 0) {
                      deep = currentDeep;                    
                      deepFile.deep = deep;
                      deepFile.filePath = currentDirectory;
                      //console.log(deepFile);
                    }
                    getDeep(currentDeep,`${currentDirectory}/${dir}`);
                      currentDeep--;
                    })       
                }
              });
            }
        })     
    }

    await getDeep(currentDeep, './node_modules')
    return deepFile;
}

console.log(await getDeepestDir());
