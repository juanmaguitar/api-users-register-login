const mongoose = require('mongoose');
const path = require('path');
const schemasFiles = require('fs').readdirSync(path.join(__dirname, '/schemas'));

const Schema = mongoose.Schema;

const models = {};
for (const file of schemasFiles) {
  const fileName = file.substring(0, file.length - 3);
  const schema = require(`./schemas/${fileName}`);
  if (schema instanceof Schema) {
    models[fileName] = mongoose.model(fileName, schema);
  } else {
    models[fileName] = mongoose.model(fileName, new mongoose.Schema(schema));
  }
}

process.getModel = (name) => models[name];
