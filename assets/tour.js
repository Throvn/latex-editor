/**
 * Checks if user is the first time there.
 * If so, plays a tour to familiarize with the controls.
 */
function playTour() {
  // check if tour should be played to explain the concepts to the user.
  if (localStorage.getItem("introductionTourCompleted")) return;

  const tour = new Shepherd.Tour({
    confirmCancel: true,
    exitOnEsc: false,
    useModalOverlay: true,
  });

  tour.addStep({
    id: "general-welcome",
    text: "<h3>Welcome to the LaTeX IDE!</h3>Here you will spent most of the time, writing LaTeX documents, testing things out and passing tests. But more about that in the following. <br><br> In the following tour you will be guided through all the different components <em>only once</em>. <br><br> So <b>pay attention</b> but should be easy. <br>",
    buttons: [
      {
        text: "Never show again",
        action: () => {
          localStorage.setItem("introductionTourCompleted", "true");
          tour.complete();
        },
      },
      {
        text: "Skip",
        action: tour.complete,
      },
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "file-step",
    text: "This is the <b>file explorer</b>. Here you can find all of the files you need. <br> Click on files to open them. <br> Or drag and drop files from your PC to upload them. <br>",
    attachTo: {
      element: ".file-highlight",
      on: "right",
    },
    classes: "file-highlight",
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "editor-step",
    text: "This is the <b>editor</b>. Inside of here, you will write the actual code. It has partly autocomplete. <br><br> In larger documents <kbd>cmd</kbd> + <kbd>f</kbd> can be used to find ocurrences. <br><br> Try changing something. <br><br> Hit <kbd>cmd</kbd> + <kbd>s</kbd> to save the document and...",
    attachTo: {
      element: "#editor",
      on: "right",
    },
    classes: "file-highlight",
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "preview-step",
    text: ".. see the finished result. Don't worry, the first time it takes up to 30s to compile, but subsequent changes are done in a less than a second. <br><br> Change something and try again.",
    attachTo: {
      element: "#preview",
      on: "left",
    },
    classes: "file-highlight",
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "compile-step",
    text: "You can also download the PDF here.",
    attachTo: {
      element: "#download",
      on: "bottom",
    },
    classes: "file-highlight",
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "output-step",
    text: "You may have noticed a change after the compilation completed. Here you will find the <b>Logs</b>. If something does not show as expected, this should be the first place to check.",
    attachTo: {
      element: "#output",
      on: "right",
    },
    classes: "file-highlight",
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "tasks-step",
    text: "Now to the most important step. <br></br> Here you will find the <b>tasks</b> you have to complete. Run a test by clicking on the run symbol (<i class='codicon codicon-run'></i>). If it turns <b class='text-success'>green</b> it means you have passed. If it turns <b class='text-danger'>red</b> it means you should try again. <br><br> When you passed all of the tests, it's time to move on.",
    attachTo: {
      element: "#tasks",
      on: "right",
    },
    classes: "file-highlight",
    buttons: [
      {
        text: "Finish",
        action: () => {
          localStorage.setItem("introductionTourCompleted", "true");
          tour.complete();
        },
      },
    ],
  });

  tour.start();
}

playTour();
