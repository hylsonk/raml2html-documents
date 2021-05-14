const fs = require('fs');
const raml2html = require('raml2html');
const configWithDefaultTheme = raml2html.getConfigForTheme();
const readHTMLDir = require('./readHTMLDir');

const convertToHTML = (ramlFile, htmlFile) => {
    raml2html.render(ramlFile, configWithDefaultTheme).then(result => {
        saveHTML(htmlFile, result);
        readHTMLDir('html');
    }, error => {
        console.error(error)
    });
}

const saveHTML = (htmlFile, htmlData) => {
    try {
        fs.writeFileSync(`html/${htmlFile}.html`, htmlData)
        console.log(`HTML ${htmlFile} Success Saved`);
    } catch (err) {
        console.error(err)
    }
}

const generate = (directoryPath) => {

    filelist = [];
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            generateHTMLNameAddRAMLPath(file)
        });
    });
}

const generateHTMLNameAddRAMLPath = (file) => {
    htmlFile = file.split('.')[0];
    convertToHTML(`raml/${file}`, htmlFile);
}

module.exports = generate;