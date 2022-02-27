const $files = document.getElementById("files");
const gistId = location.hash.substring(1) || "";
let fs = JSON.parse(localStorage.getItem("fs" + gistId));

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
 * Opens the desired file (either in custom container or as window.open)
 * @param {string} filePath
 */
const openFile = (filePath) => {
  const file = getFile(filePath);
  console.info(file);
  if (file.type.search(/text|File|tex|json/) > -1) {
    editor.setValue(file.contents);
    $editor.style.display = "block";
    $imagePreview.parentElement.parentElement.style.display = "none";
    $defaultScreen.style.display = "none";
  } else if (file.type.search(/image/) > -1) {
    $imagePreview.src = file.contents;
    $imagePreview.parentElement.parentElement.style.display = "block";
    $editor.style.display = "none";
    $defaultScreen.style.display = "none";
  } else {
    window.open(file.contents);
  }
};

/**
 * Updates the file contents and saves it to local storage.
 * @param {string} filePath file to be updated inside of `fs`
 * @param {string} fileContents
 */
const updateAndSaveFile = (filePath = "", fileContents = "") => {
  const file = getFile(filePath);
  if (fileContents) file.contents = fileContents;

  saveFS();
};
