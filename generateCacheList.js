const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'images');
const outputFilePath = path.join(__dirname, 'cacheList.json');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  const fileList = files.map(file => `/images/${file}`);
  fs.writeFileSync(outputFilePath, JSON.stringify(fileList, null, 2));
  console.log('Cache list generated and saved to cacheList.json');
});
