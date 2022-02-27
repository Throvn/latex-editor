console.log("Checking for file load url...");

function initEditorGist() {
  const gistId = location.hash.substring(1);
  if (location.hash && gistId.length === 32) {
    console.log("Found task");
    fetch("https://api.github.com/gists/" + gistId, {
      method: "GET",
    })
      .then((result) => result.json())
      .then((result) => {
        for (const fileName in result.files) {
          if (Object.hasOwnProperty.call(result.files, fileName)) {
            const file = result.files[fileName];
            switch (fileName) {
              case "solution.tex":
                console.log("Hide solutions");
                break;
              case "tests.json":
                window.tests = JSON.parse(file.content);
                renderTests(tests);
                break;
              default:
                createFile(file.filename, file.content, file.type, "");
                break;
            }
          }
        }
        $files.innerHTML = getTreeHTML(fs);
        updateTree();
      })
      .catch((e) => console.error(e));
  }
}
