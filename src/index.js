const $preview = document.getElementById("preview");
const $download = document.getElementById("download");
const $compile = document.getElementById("compile");
const $tabs = document.getElementById("tabs");
console.log(editor.getValue());
let texlive = new TeXLive("./assets/texlivejs/");
let tempTexLive = new TeXLive("./assets/texlivejs/");

document.getElementById("compile").onclick = () => {
  $compile.classList.add("disabled");
  $compile.innerHTML = `<i class="codicon codicon-run"></i> Compiling`;

  const latex_code = editor.getValue();
  texlive.pdftex.compile(latex_code).then(function (pdf) {
    $preview.src = pdf;
    $download.href = pdf;

    // TODO: Continue implementing files
    texlive.pdftex.FS_readFile();

    tempTexLive = new TeXLive("./assets/texlivejs/");

    texlive.terminate();
    $compile.innerHTML = `<i class="codicon codicon-run"></i> Compile`;
    $compile.classList.remove("disabled");
  });
};

const addFileToEmscriptenFS = (name, contents, path) => {
  console.log("AddFileToEmscriptenFS:");
  console.log(name);
  console.log(path);
  texlive = new TeXLive("./assets/texlivejs/");

  texlive.pdftex
    .FS_createPath("/", path, /*canRead=*/ true, /*canWrite=*/ true)
    .then(function () {
      console.log("createdPATH");
      texlive.pdftex
        .FS_createLazyFile(
          "/" + path,
          name,
          contents,
          /*canRead=*/ true,
          /*canWrite=*/ true
        )
        .then(function () {
          console.log("createdDATAFILE");
          console.log(editor.getValue());
          console.log(texlive.pdftex);
          texlive.pdftex.compile(editor.getValue()).then(function (pdf) {
            console.log("createdCOMPILATION");
            $preview.src = pdf;
            $download.href = pdf;

            texlive.terminate();
          });
        });
    });
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
