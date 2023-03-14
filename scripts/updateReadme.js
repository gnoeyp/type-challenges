const fs = require('fs')
const VerEx = require('verbal-expressions')


const replaceColor = (regExp, source) => {
  const found = source.match(regExp)[0]
  const splitted = found.split('-')
  splitted[splitted.length - 1] = 'gray"'
  const target = splitted.join('-')
  return regExp.replace(source, target)
}

const replaceLink = (regExp, source, filename) => {
  const found = source.match(regExp)[0]
  const target = VerEx().find('./questions/').anythingBut('"').then('"').replace(found, `./solutions/${filename}"`)
  return regExp.replace(source, target)
}

try {
  const filenames = fs.readdirSync('solutions')
  let readmeContent = fs.readFileSync('README.md', 'utf8')
  filenames.forEach(filename => {
    const id = filename.split('-')[0]
    const regExp = VerEx().find('<a href="./questions/').then(id).anythingBut('>').then('>').maybe(' ').then('<img src="https://img.shields.io/badge/').anythingBut('"').then('"')
    readmeContent = replaceColor(regExp, readmeContent)
    readmeContent = replaceLink(regExp, readmeContent, filename)
  })

  fs.writeFileSync('README.md', readmeContent)
} catch (error) {
  console.log(error)
}