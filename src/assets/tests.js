const tests = [
  {
    title: "Hello, World!",
    desc: `Create an empty document which shows nothing but 'Hello, World!' in the body.`,
    type: "text", // or "visual"
    test: /\\title{ *Hello, World! *}/g,
  },
];

const $tasks = document.getElementById("tasks");
function renderTests(tests = []) {
  let i = 0;
  for (const test of tests) {
    console.log(test.title);
    $tasks.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header btn-group btn-block btn-test-run" id="test-run-${i}">
                <button class="btn btn-primary flex-grow-0">
                    <i class="codicon codicon-debug-alt"></i>
                </button>
                <button class="btn btn-secondary flex-grow-1 text-left" type="button"
                    data-bs-toggle="collapse" data-bs-target="#test-desc-${i}" aria-expanded="true"
                    aria-controls="test-desc-${i}">
                    ${test.title}
                </button>
            </h2>
            <div id="test-desc-${i}" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#tasksAccordion">
                <div class="accordion-body">
                    ${test.desc}
                </div>
            </div>
        </div>`;

    i++;
  }
}

renderTests(tests);

document.getElementsByClassName("btn-test-run");
