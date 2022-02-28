console.log("Checking for file load url...");

/**
 * Saves all of the files to localStorage
 */
const saveFS = () => {
  const gistId = location.hash.substring(1) || "";
  localStorage.setItem("fs" + gistId, JSON.stringify(fs));
};

function initEditorGist() {
  const gistId = location.hash.substring(1);
  if (!location.hash || gistId.length !== 32) {
    throw new Error("Could not retrireve tasks");
  }
  console.log("Found task");

  if (localStorage.getItem("fs" + gistId)) {
    fs = JSON.parse(localStorage.getItem("fs" + gistId));
    window.tests = JSON.parse(localStorage.getItem("test" + gistId));
    addToTabs(getFile("main.tex"), "main.tex");
    openFile("main.tex");
    compileLaTeX();

    renderTests(window.tests);
    $files.innerHTML = getTreeHTML(fs);
    updateTree();
  } else {
    fs = {
      label: "root",
      type: "Directory",
      children: [
        {
          label: "assets",
          type: "Directory",
          children: [
            {
              label: "images",
              type: "Directory",
              children: [
                {
                  label: "README.md",
                  type: "File",
                  contents: `# Readme\n\nIn the assets folder you can 'upload' personal files.
None of them leave your device of course.
Upload images or other TeX files and work with them inside of your projects.

## How to upload?

Just drag and drop the file(s), you will have visual feedback.`,
                },
              ],
            },
          ],
        },
      ],
    };
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
                localStorage.setItem("test" + gistId, file.content);
                break;
              default:
                createFile(file.filename, file.content, file.type, "");
                break;
            }
          }
        }
        saveFS();
      })
      .catch(handleError)
      .finally(() => {
        renderTests(window.tests);
        $files.innerHTML = getTreeHTML(fs);
        updateTree();
      });
  }
}
