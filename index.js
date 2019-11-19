// node modules
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);