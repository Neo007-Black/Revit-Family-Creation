import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

let changedFiles = [];
walkDir('src', function (filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');

        let newContent = content.replace(/color:\s*['"]#fff['"]/g, "color: '#000'")
            .replace(/color:\s*['"]#(ffffff|FFFFFF|FFF)['"]/g, "color: '#000'")
            .replace(/color:\s*['"]white['"]/g, "color: '#000'")
            .replace(/background:\s*['"]#fff['"]/g, "background: '#000'")
            .replace(/color:\s*activeTab === '[a-z]+' \? '#fff' : 'var\(--text-secondary\)'/g, "color: '#000'")
            .replace(/color:\s*isType \? '#fff' : '#000'/g, "color: '#000'")
            .replace(/color:\s*!isType \? '#fff' : '#000'/g, "color: '#000'");

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            changedFiles.push(filePath);
        }
    }
});

console.log('Changed files:', changedFiles);
