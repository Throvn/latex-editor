const $preview = document.getElementById("preview");
const $download = document.getElementById("download");
const $compile = document.getElementById("compile");
const $tabs = document.getElementById("tabs");
const $output = document.getElementById("output");
console.log(editor.getValue());

const engine = new PdfTeXEngine();

const initSwiftLatex = async () => {
  await engine.loadEngine();
};

initSwiftLatex()
  .then(() => {
    console.log("Finished loading engine");
    document.getElementById("loading").remove();
  })
  .catch((e) => {
    console.error(e);
  });

document.getElementById("compile").onclick = () => {
  $compile.classList.add("disabled");
  $compile.innerHTML = `<i class="codicon codicon-run spinning"></i> Compiling`;

  const latex_code = editor.getValue();
  // TODO(Throvn): Load all files efficiently into MemFS
  engine.writeMemFSFile("main.tex", latex_code);
  engine.setEngineMainFile("main.tex");

  engine
    .compileLaTeX()
    .then((result) => {
      $output.innerHTML = result.log;
      console.info(result);
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

      $compile.innerHTML = `<i class="codicon codicon-run"></i> Compile`;
      $compile.classList.remove("disabled");
    })
    .catch((e) => console.error(e));
};

const addFileToEmscriptenFS = (name = "", contents, path = "/") => {
  console.log("AddFileToEmscriptenFS:");

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
};

/**
 * Adds the file to the tabs if not open yet
 * @param {object} file
 * @param {string} filePath
 */
const addToTabs = (file, filePath) => {
  for (let i = 0; i < $tabs.children.length; i++) {
    const $tab = $tabs.children[i];
    if ($tab.getAttribute("path") === filePath) {
      console.info(file.label, "already open");
      // TODO: update active tab
      return;
    }
  }

  $tabs.insertAdjacentHTML(
    "beforeend",
    `<div class="tab" path="${filePath}" onclick="openFile('${filePath}'); setAsActiveTab(this);">
      <i class="codicon codicon-close" onclick="this.parentElement.remove()"
        style="position: relative; transform: translateY(-60%); top: 50%;"></i>
      ${file.label}
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
