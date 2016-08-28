const mongoose = require('mongoose');
const path = require('path');
const schemasFiles = require('fs').readdirSync(path.join(__dirname, '/schemas'));

const models = {};
for (const file of schemasFiles) {
  const fileName = file.substring(0, file.length - 3);
  const schemaDef = require(`./schemas/${fileName}`);
  models[fileName] = mongoose.model(fileName, new mongoose.Schema(schemaDef));
}

console.log("sharing getModel...");
process.getModel = (name) => models[name];
