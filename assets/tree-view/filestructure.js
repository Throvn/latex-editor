const fs = require("fs");
const path = require("path");

function getFileStructure(dir) {
  let arr = [];
  let items = fs.readdirSync(dir);

  items = items.sort((a, b) => {
    if (fs.lstatSync(path.join(dir, a)).isDirectory()) {
      return -1;
    } else {
      return 1;
    }
  });
  for (const item in items) {
    const curPath = path.join(dir, items[item]);
    if (fs.lstatSync(curPath).isDirectory()) {
      arr.push({
        label: items[item],
        type: "Directory",
        path: curPath,
        children: getFileStructure(curPath),
      });
    } else {
      arr.push({
        label: items[item],
        type: "File",
        path: curPath,
      });
    }
    items[item] = undefined;
  }
  return arr;
}

function getTreeHTML(dir = "", counter = 0) {
  let htmlString = "";
  let items = fs.readdirSync(dir);

  items = items.sort((a, b) => {
    if (fs.lstatSync(path.join(dir, a)).isDirectory()) {
      return -1;
    } else {
      return 1;
    }
  });
  for (const item in items) {
    counter++;
    const curPath = path.join(dir, items[item]);
    if (fs.lstatSync(curPath).isDirectory()) {
      htmlString +=
        '<li class="tree-item"> <span id="exp' +
        counter +
        '" class="expander"><i class="codicon codicon-chevron-right"></i><span class="tree-item-text">' +
        items[item] +
        '</span> </span> <li id="child' +
        counter +
        '" class="tree-item" style="display: none;"> <ul class="tree-expandable"> ' +
        getTreeHTML(curPath, counter) +
        " </ul> </li> </li>";
    } else {
      htmlString +=
        '<li class="tree-item"> <span class="indent"> <span class="tree-item-text"> ' +
        items[item] +
        " </span> </span> </li>";
    }
    items[item] = undefined;
  }
  return htmlString;
}

module.exports = { getFileStructure, getTreeHTML };
