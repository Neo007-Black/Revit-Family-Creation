const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/components/*.jsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/color:\s*['"]#fff['"]/g, "color: '#000'")
                          .replace(/color:\s*['"]#(ffffff|FFFFFF|FFF)['"]/g, "color: '#000'")
                          .replace(/color:\s*['"]white['"]/g, "color: '#000'")
                          .replace(/background:\s*['"]#fff['"]/g, "background: '#000'")
                          .replace(/color:\s*activeTab === '[a-z]+' \? '#fff' : 'var\(--text-secondary\)'/g, "color: '#000'")
                          .replace(/color:\s*isType \? '#fff' : '#000'/g, "color: '#000'")
                          .replace(/color:\s*!isType \? '#fff' : '#000'/g, "color: '#000'");

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed', file);
  }
}
