const ejs = require('ejs');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const klawSync = require('klaw-sync')
const path = require('path');

function capitalizeFirstLetter(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function writeTemplateFile(path, data) {
  ejs.renderFile(path, data, {}, function (renderError, str) {
    if (renderError) {
      throw new Error(renderError);
    }

    let targetPath = path.replace('generator', `modules/${data.module.name}`);
    targetPath = targetPath.replace('module.ejs', `${data.module.name}.js`);
    targetPath = targetPath.replace('.ejs', '');

    console.log(`Writing ${targetPath}`);
    fs.outputFile(targetPath, str, function (writeError) {
      if (writeError) {
        throw new Error(writeError);
      }

      console.log(`${targetPath} has been created.`);
    });
  });
}

const questions = [{
  name: 'name',
  message: 'What\'s the name of the module?',
  filter(name = '') {
    return name.replace(/\s+/g, '-').toLowerCase();
  }
}, {
  name: 'description',
  message: 'Can you provide a short description?',
  filter(description = '') {
    return capitalizeFirstLetter(description.trim());
  }
}];

inquirer.prompt(questions)
  .then((answers) => {
    return {
      name: answers.name,
      description: answers.description,
      exportName: capitalizeFirstLetter(answers.name)
    };
  })
  .then(async (data) => {
    const cwd = process.cwd();
    const targetDir = path.join(cwd, `modules/${data.name}`);

    console.log(`Creating ${targetDir} directory...`);
    await fs.mkdir(targetDir);

    console.log('Generating files...');
    const templates = klawSync(path.join(cwd, 'generator'), {nodir: true}).map((file) => file.path);
    templates.forEach((file) => {
      writeTemplateFile(file, { module: data });
    });
  });