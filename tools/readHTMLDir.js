const fs = require('fs');

const readHTMLDir = (directoryPath) => {
    var htmlContent = "";
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            htmlContent = `${htmlContent}${makeHtmlList(file)}`
        });

        buildHtmlLinkList(htmlContent);

    });
}

const makeHtmlList = (file) => {
    return `<li><a href='./html/${file}'>${file}</a></li>`
}

const buildHtmlLinkList = (htmlContent) => {
    htmlContent = `<html><ul>${htmlContent}</ul></html>`

    fs.writeFile('index.html', htmlContent, (error) => { /* handle error */ });
}

module.exports = readHTMLDir;