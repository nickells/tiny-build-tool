const makeTemplate = require('./module.js')

let options = {
  templatePath: './template.html',
  documentPath: './test.html',
  renderTarget: '#blog',
  contentPath: './content.json',
}

makeTemplate({
  templatePath: './template.html',
  documentPath: './test.html',
  renderTarget: '#blog',
  contentPath: './content.json',
})