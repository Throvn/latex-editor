const $files = document.getElementById("files");

const createFolder = (name) => {
  const newFolder = {
    label: name,
    type: "Directory",
    contents: [],
  };
  path[path.length - 1].contents.push(newFolder);
};

console.log("FSS ", fs);

/**
 * Creates a file in the `fs`-object
 * @param {string} name - Name of the file
 * @param {string} contents - File contents
 * @param {string} type - Directory or other
 * @param {string} path - folter path
 */
const createFile = (name, contents, type, path = "") => {
  console.log("Creating file...");
  const pathObject = path.split("/");
  let currDir = fs;

  if (path !== "/") {
    for (let i = 0; i < pathObject.length; i++) {
      const currentDir = currDir.children.find((el) => {
        console.log(el.label, pathObject[i]);
        return el.label === pathObject[i];
      });
      if (currentDir) {
        currDir = currentDir;
      }
    }
  }

  if (!type && contents === null) {
    currDir.children.push({
      label: name,
      children: [],
      type: "Directory",
    });
  } else {
    currDir.children.push({
      label: name,
      contents,
      type,
    });
    addFileToEmscriptenFS(name, contents, path);
  }

  console.log("file created!");
};
console.info(fs);
$files.innerHTML = getTreeHTML(fs);
updateTree();

/**
 * Retrieves the object of the path
 * @returns {object} the retrived file
 * @param {string} path - the path of the retrieving object
 */
const getFile = (path) => {
  const pathObject = path.split("/");
  let currDir = fs;
  for (let i = 0; i < pathObject.length; i++) {
    const currentDir = currDir.children.find((el) => {
      console.log(el.label, pathObject[i]);
      return el.label === pathObject[i] ? true : false;
    });
    currDir = currentDir;
  }

  return currDir;
};

/**
 * Saves all of the filse to localStorage
 */
const saveFS = () => {
  localStorage.setItem("fs", JSON.stringify(fs));
};
