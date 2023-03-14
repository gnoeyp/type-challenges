const fs = require('fs')
const VerEx = require('verbal-expressions')

try {
  const ids = fs.readdirSync('solutions').map(filename => filename.split('-')[0])
  let readmeContent = fs.readFileSync('README.md', 'utf8')
  ids.forEach(id => {
    const regExp = VerEx().find('<a href="./questions/').then(id).anythingBut('>').then('>').maybe(' ').then('<img src="https://img.shields.io/badge/').anythingBut('"').then('"')
    const found = readmeContent.match(regExp)[0]
    const splitted = found.split('-')
    splitted[splitted.length - 1] = 'teal"'
    const target = splitted.join('-')
    readmeContent = regExp.replace(readmeContent, target)
  })

  fs.writeFileSync('README.md', readmeContent)
} catch (error) {
  console.log(error)
}