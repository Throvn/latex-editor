"use strict";

const $preview = document.getElementById("preview");
const $download = document.getElementById("download");
const $compile = document.getElementById("compile");
const $tabs = document.getElementById("tabs");
const $output = document.getElementById("output");
const $outputDownload = document.getElementById("btn-dl-output");

const engine = new PdfTeXEngine();

const initSwiftLatex = async () => {
  await engine.loadEngine();
};

initSwiftLatex()
  .then(() => {
    console.log("Finished loading engine");
    document.getElementById("loading").remove();

    initEditorGist();
  })
  .catch(handleError);

/**
 * Compiles the currently open file.
 * Also updates the UI accordingly.
 */
const compileLaTeX = () => {
  $compile.classList.add("disabled");
  $compile.innerHTML = `<i class="codicon codicon-run spinning"></i> Compiling`;

  const latex_code = editor.getValue();
  // since there is always only one single active tab
  const storeLocation = document
    .getElementsByClassName("tab-active")[0]
    .getAttribute("path");
  updateAndSaveFile(storeLocation, latex_code);
  // TODO(Throvn): Load all files efficiently into MemFS
  engine.writeMemFSFile("main.tex", latex_code);
  engine.setEngineMainFile("main.tex");

  engine
    .compileLaTeX()
    .then((result) => {
      $output.innerText = result.log;
      $outputDownload.href = "data:text/plain," + result.log;
      console.info(result);

      if (result.status !== 0) {
        enableCompileButton();
        throw new Error("Could not produce PDF file.");
      }

      let binary = "";
      const len = result.pdf.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(result.pdf[i]);
      }
      return "data:application/pdf;base64," + window.btoa(binary);
    })
    .then(function (pdf) {
      console.log(pdf);
      $preview.src = pdf;
      $download.href = pdf;

      enableCompileButton();
    })
    .catch(handleError);
};

document.getElementById("compile").onclick = compileLaTeX;

/**
 * adds the specified file to the emscripten filesystem.
 * @param {string} name
 * @param {string|Uint8Array} contents file contents
 * @param {string} path filesystem path with "/" as seperator
 */
const addFileToEmscriptenFS = (name = "", contents, path = "/") => {
  console.log("AddFileToEmscriptenFS:");

  if (!engine.isReady()) {
    throw new Error(
      "Could not add" +
        name +
        " to emscripten, because engine is not yet ready."
    );
  }
  console.log(path + "/" + name, contents);
  for (const folder of path.split("/")) {
    try {
      engine.makeMemFSFolder(folder);
    } catch (e) {
      console.info(e);
    }
  }
  engine.writeMemFSFile(path + "/" + name, contents);
  console.log("created new file");
};

/**
 * Deletes all ui tabs
 */
const deleteAllTabs = () => {
  document.getElementById("tabs").innerHTML = `
  <div class="tab" style="color: red;" onclick="deleteAllTabs()">
    <i class="codicon codicon-trash"
      style="position: relative; transform: translateY(-60%); top: 50%;"></i>
  </div>`;

  $defaultScreen.style.display = "block";
  $editor.style.display = "none";
  $imagePreview.parentElement.parentElement.style.display = "none";
};

/**
 * Adds the file to the tabs if not open yet. Or activates tab, if open
 * @param {object} file
 * @param {string} filePath
 */
const addToTabs = (file, filePath) => {
  for (let i = 0; i < $tabs.children.length; i++) {
    const $tab = $tabs.children[i];
    if ($tab.getAttribute("path") === filePath) {
      console.info(file.label, "already open");
      setAsActiveTab($tab);
      return;
    }
  }

  $tabs.insertAdjacentHTML(
    "beforeend",
    `<div class="tab" path="${filePath}">
      <i class="codicon codicon-close" onclick="removeTab(this.parentElement);"
        style="position: relative; transform: translateY(-60%); top: 50%;"></i>
      <span onclick="openFile('${filePath}'); setAsActiveTab(this.parentElement);">${file.label}</span>
    </div>`
  );
  setAsActiveTab($tabs.lastChild);
};

/**
 * Sets the element as the ONLY active tab
 * @param tab
 */
const setAsActiveTab = (tab) => {
  for (let i = 0; i < $tabs.children.length; i++) {
    const currentTab = $tabs.children[i];
    if (currentTab.classList.contains("tab-active")) {
      currentTab.classList.remove("tab-active");
    }
  }
  tab.classList.add("tab-active");
};

/**
 * Removes the tab from the ui, but also from the editor, and makes a new one active.
 * @param {HTMLElement} tab the tab to be removed
 */
const removeTab = (tab) => {
  tab.remove();

  // if all tabs exept for 'delete all' are closed
  if ($tabs.children.length === 1) showScreen("default");
  else if (tab.classList.contains("tab-active")) {
    const nextShownTab = $tabs.children.item($tabs.children.length - 1);
    setAsActiveTab(nextShownTab);
    openFile(nextShownTab.getAttribute("path"));
  }
};
/**
 * Makes the Compile button in the ui clickable again
 */
function enableCompileButton() {
  $compile.innerHTML = `<i class="codicon codicon-run"></i> Compile`;
  $compile.classList.remove("disabled");
}

// prevent opening of save dialog
// compile document instead
document.onkeydown = (ev) => {
  if (ev.metaKey && ev.key === "s") {
    ev.preventDefault();
    compileLaTeX();
  }
};

/**
 * Shows the desired screen, and hides all of the other
 * @param {string} screenName the screen to show (default|image|editor)
 */
function showScreen(screenName = "default") {
  switch (screenName) {
    case "image":
      $defaultScreen.style.display = "none";
      $editor.style.display = "none";
      $imagePreview.parentElement.parentElement.style.display = "block";
      break;
    case "editor":
      $defaultScreen.style.display = "none";
      $editor.style.display = "block";
      $imagePreview.parentElement.parentElement.style.display = "none";
      break;
    case "default":
    default:
      $defaultScreen.style.display = "block";
      $editor.style.display = "none";
      $imagePreview.parentElement.parentElement.style.display = "none";
      break;
  }
}
