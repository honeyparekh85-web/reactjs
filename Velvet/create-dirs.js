const fs = require('fs');
const path = require('path');

const basePath = 'c:\\Users\\Honey\\OneDrive\\Desktop\\react js\\Velvet House';
const dirs = [
  'src\\app',
  'src\\features\\cart',
  'src\\features\\products',
  'src\\features\\auth',
  'src\\features\\wishlist',
  'src\\pages',
  'src\\components'
];

dirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log('Created: ' + dir);
  } else {
    console.log('Already exists: ' + dir);
  }
});
