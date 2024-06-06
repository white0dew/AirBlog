const fs = require('fs');
const path = require('path');

// 用于读取JSON文件的函数
function readJsonFile(filePath) {
    try {
        // 同步读取文件内容
        const jsonString = fs.readFileSync(filePath, 'utf-8');
        // 将JSON字符串转换为JavaScript对象
        const jsonObj = JSON.parse(jsonString);
        return jsonObj;
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}

// 读取docPath文件夹下所有文件和文件夹的路径，并返回一个数组
function getAllFiles(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles.push(path.join(dirPath, "/", file));
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}
// 删除不在docPath中的文件
function deleteFilesNotInDocPaths(docsData, baseDocPath) {
    // 获取所有文件的路径
    let allPaths = getAllFiles(baseDocPath);

    // 遍历文档中的每个docPath
    docsData.docs.forEach((doc) => {
        // 构建完整的文件路径
        // 构建完整的文件路径
        const fullPath = path.join(baseDocPath, doc.relativePath);
        // console.log("fullPath", fullPath)
        // // 检查这个路径是否存在于allPaths数组中
        // // 检查这个路径是否存在于allPaths数组中
        // if (!allPaths.includes(fullPath)) {
        //     // 如果不存在，则删除文件
        //     if (fs.existsSync(fullPath)) {
        //         fs.unlinkSync(fullPath);
        //         console.log(`Deleted: ${fullPath}`);
        //     }
        // }
        // 检查文件是否在文件路径列表中
        if (!allPaths.includes(fullPath)) {
            // 检查文件的父目录是否在目录路径列表中
            let parentDir = path.dirname(fullPath);
            let parentDirExistsInPaths = false;

            while (parentDir !== baseDocPath) {
                if (allPaths.dirs.includes(parentDir)) {
                    parentDirExistsInPaths = true;
                    break;
                }
                parentDir = path.dirname(parentDir); // Move up in the directory tree
            }

            // 如果文件及其父目录都不在列表中，则删除该文件
            if (!parentDirExistsInPaths) {
                // if (fs.existsSync(fullPath)) {
                //     fs.unlinkSync(fullPath);
                //     console.log(`Deleted: ${fullPath}`);
                // }
                console.log(`Kept parentDirExistsInPaths ${fullPath}`);
            } else {
                console.log(`Kept (due to parent dir): ${fullPath}`);
            }
        } else {
            console.log(`Kept: ${fullPath}`);
        }
    });
}

// 调用函数，读取并解析JSON文件
const data = readJsonFile('./elog.cache.json');

// 如果data不是null，则可以使用data对象
if (data) {
    // console.log(data.docs);
}

// 基础文档路径
const baseDocPath = 'docs/doc';

// 调用函数
deleteFilesNotInDocPaths(data, baseDocPath);