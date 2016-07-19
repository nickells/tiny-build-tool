'use strict';

const Interpolation = require('tiny-interpolator')
const cheerio = require('cheerio')
const fs = require('fs')
const bluebird = require('bluebird')
const readFile = bluebird.promisify(fs.readFile)


function writeHTML(filePath, template, content, target, documentPath){
  let parser = cheerio.load(documentPath)
  let elem = parser(target)
  elem.html(new Interpolation(content,template).output);  
  return fs.writeFile(filePath, parser.html())
}

function makeFile(options){
  return bluebird.props({
    template: readFile(options.templatePath,'utf8'),
    content: readFile(options.contentPath, 'utf8'),
    documentPath: readFile(options.documentPath, 'utf8'),
    outputPath: options.outputPath ? options.outputPath : options.documentPath
  })
  .then(data=>{
    const { template, content, documentPath, outputPath } = data
    return writeHTML(outputPath, template, JSON.parse(content), options.renderTarget, documentPath)
  })
  .catch(err=>{
    console.log(err)
  })
}

module.exports = makeFile;
