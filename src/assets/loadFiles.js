console.log("Checking for file load url...");
console.log("FS", fs);
console.log(location.hash);

function initEditorGist() {
  console.log("BEFORE FS", fs);
  const gistId = location.hash.substring(1);
  if (location.hash && gistId.length === 32) {
    console.log("Found task");
    fetch("https://api.github.com/gists/" + gistId, {
      method: "GET",
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        for (const fileName in result.files) {
          if (Object.hasOwnProperty.call(result.files, fileName)) {
            const file = result.files[fileName];
            console.log("FS", fs);
            createFile(file.filename, file.content, file.type, "");
          }
        }
        $files.innerHTML = getTreeHTML(fs);
        updateTree();
      })
      .catch((e) => console.error(e));
  }
}
