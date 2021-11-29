/*
 * @Description:自动生成引入文件
 * @Author: bb f
 * @Date: 2021-11-26 17:05:24
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-26 17:18:22
 */
//图片导入目录
const baseImportDir = '../src/assets/images';
//打包后的导入路径
const importPrefix = '@/assets/images/';
//打包后的文件
const dstFile = '../src/store/icon.ts';
// 需要打包的文件正则
const fileReg = /(\\|\/)?(.*)\.(jpg|jpeg|png|svg|gif)$/i;
const nameReg = /(.*(\/|\\))*(.*)\.(jpg|jpeg|png|svg|gif)$/i;
const path = require('path');
const fs = require('fs');

const df = fs.openSync(dstFile, 'w');

//重写特殊字符有
function nameRewrite(name) {
    if (name)
        return name
            .split(/-|@|\.|\*|^ [0-9]*$/)
            .map((v, k) => {
                if (k == 0) {
                    return v;
                } else {
                    return v.toUpperCase();
                }
            })
            .join('');
}

let fileNames = [];

function writeImportLine(fPath) {
    //只有匹配的才输出
    if (fPath.match(fileReg)) {
        if (fPath.match(nameReg)) {
            //获得输出名称和导入地址
            let name = nameRewrite(RegExp.$3);
            fileNames.push(name);
            let url = path.join(importPrefix, fPath).replace(/\\/g, '/');
            let line = `import ${name} from \"${url}\";\n`;
            fs.writeFileSync(df, line, { flag: 'a+' });
        }
    }
}

function writeTail() {
    let template = `export default{\n
        ${fileNames.join(',\n')}
    \n}`;
    fs.writeFileSync(df, template, { flag: 'a+' });
}
/**
 *
 * @param {*} dir 相对于baseImportDir 的相对路径
 */
function importImage(rDir = '') {
    let dir = path.join(baseImportDir, rDir);
    let dirInfo = fs.readdirSync(dir, { withFileTypes: true });
    dirInfo.forEach(f => {
        if (f.isDirectory()) {
            //处理子目录
            importImage(path.join(rDir, f.name));
        } else {
            writeImportLine(path.join(rDir, f.name));
        }
    });
}

function index() {
    importImage();
    writeTail();
    fs.closeSync(df);
}
index();
