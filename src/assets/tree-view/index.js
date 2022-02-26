const $editor = document.getElementById("editor");
const $imagePreview = document.getElementById("imagePreview");

/**
 * Goes through the already rendered DOM structure and makes tree interactive
 *
 * Call after `$files.innerHTML = getTreeHTML(fs);`
 */
function updateTree() {
  // Handle expandables
  const expandables = document.getElementsByClassName("expander");

  for (let i = 0; i < expandables.length; i++) {
    const element = expandables[i];
    element.onclick = (event) => {
      if (
        event.srcElement.parentElement.children[0].classList.value.includes(
          "codicon-chevron-right"
        )
      ) {
        event.srcElement.parentElement.children[0].classList.value =
          "codicon codicon-chevron-down";
        const id = event.srcElement.parentElement.id.match(/\d+/)[0]; // cuttet das exp vor der id weg
        document
          .getElementById("child" + id)
          .setAttribute("style", "display: inline-block;");
      } else {
        event.srcElement.parentElement.children[0].classList.value =
          "codicon codicon-chevron-right";
        const id = event.srcElement.parentElement.id.match(/\d+/)[0]; // cuttet das exp vor der id weg
        document
          .getElementById("child" + id)
          .setAttribute("style", "display: none;");
      }
    };
    element.ondragenter = (event) => {
      element.style.backgroundColor = "#6c757d";
      element.style.color = "#eee";
    };
    element.ondragleave = (event) => {
      element.style.backgroundColor = "transparent";
      element.style.color = "inherit";
    };
    element.ondragover = (event) => {
      event.preventDefault();
      element.style.backgroundColor = "#6c757d";
      element.style.color = "#eee";
    };

    element.ondrop = (event) => {
      event.preventDefault();
      element.style.backgroundColor = "transparent";
      element.style.color = "inherit";
      for (let i = 0, file; (file = event.dataTransfer.files[i]); i++) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (fileEvent) => {
          createFile(
            file.name,
            fileEvent.target.result,
            file.type,
            element.getAttribute("path") + element.innerText
          );
          console.log("Updating Tree... ");
          $files.innerHTML = getTreeHTML(fs);
          updateTree();

          saveFS();
        };
      }
    };
  }

  // Handle tree items
  const items = document.getElementsByClassName("tree-item-text");
  for (let i = 0; i < items.length; i++) {
    const item = items.item(i);
    item.onclick = (event) => {
      const file = getFile(item.getAttribute("path") + item.innerText);
      if (file) {
        addToTabs(file, item.getAttribute("path") + item.innerText);
        openFile(item.getAttribute("path") + item.innerText);
      }
    };
  }
}

const parent = document.createElement("ul");
parent.classList.add("tree-expandable-parent");

let fs = JSON.parse(localStorage.getItem("fs")) || {
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
          children: [],
        },
      ],
    },
    {
      label: "main.tex",
      type: "text/plain",
      contents: `\documentclass[12pt,fleqn,leqno,letterpaper]{article}
  
    \include{preamble}
      
      \title{Document Title}
      \author{Author Name\\
        \small{Class Number - Class Name}\\
        \small{Your Educational Institution}\\
        \small{\texttt{email@address.com}}
      }
      \date{December 15, 2012}
      
    \begin{document}
      
      \setstretch{1.00}
      \maketitle
    \end{document}`,
    },
  ],
};

function getTreeHTML(dir, counter = 0, currentPath = "") {
  let htmlString = "";
  const items = dir.children.sort((a, b) => {
    if (a.type === "Directory") {
      return -1;
    } else {
      return 1;
    }
  });

  for (const item in items) {
    counter++;
    if (items[item].type === "Directory") {
      htmlString +=
        '<li class="tree-item"> <div id="exp' +
        counter +
        '" class="expander" path="' +
        currentPath +
        '"><i class="codicon codicon-chevron-right"></i><span class="tree-item-text">' +
        items[item].label +
        '</span> </div> <li id="child' +
        counter +
        '" class="tree-item" style="display: none;"> <ul class="tree-expandable"> ' +
        getTreeHTML(
          items[item],
          counter,
          currentPath + items[item].label + "/"
        ) +
        " </ul> </li> </li>";
    } else {
      htmlString +=
        '<li class="tree-item"> <span class="indent"> <span class="tree-item-text" path="' +
        currentPath +
        '"> ' +
        items[item].label +
        " </span> </span> </li>";
    }
  }
  return htmlString;
}

/**
 * Opens the desired file (either in custom container or as window.open)
 * @param {string} filePath
 */
const openFile = (filePath) => {
  const file = getFile(filePath);
  console.info(file);
  if (file.type.search(/text|File/) > -1) {
    editor.setValue(file.contents);
    $editor.style.display = "block";
    $imagePreview.parentElement.parentElement.style.display = "none";
  } else if (file.type.search(/image/) > -1) {
    $imagePreview.src = file.contents;
    $imagePreview.parentElement.parentElement.style.display = "block";
    $editor.style.display = "none";
  } else {
    window.open(file.contents);
  }
};
