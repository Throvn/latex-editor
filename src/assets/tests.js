const md2html = new showdown.Converter();

const $tasks = document.getElementById("tasks");
function renderTests(tests = []) {
  let i = 0;
  for (const test of tests) {
    console.log(test.title);
    $tasks.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header btn-group btn-block btn-test-run" id="test-run-${i}">
                <button onclick="runTest(${i})" class="btn btn-primary flex-grow-0" id="btn-test-run-${i}">
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
                    ${md2html.makeHtml(test.desc)}
                </div>
            </div>
        </div>`;

    i++;
  }
}

/**
 * Tests the given test and gives ui feedback.
 * @param {number} testNr the test to evaluate
 */
function runTest(testNr = 0) {
  const $test = document.getElementById("btn-test-run-" + testNr);
  try {
    if (!tests) throw new Error("GLOBAL Test object does not exist");
    if (testNr < 0 || testNr >= tests.length)
      throw new Error("Test does not exsist");

    const test = new RegExp(tests[testNr].test);
    const testFile = getFile(tests[testNr].file);
    console.log(testFile.contents, test);
    if (!test.test(testFile.contents)) {
      throw new Error("Test failed.");
    }

    $test.classList.remove("btn-primary");
    $test.classList.remove("btn-danger");
    $test.classList.add("btn-success");
  } catch (error) {
    $test.classList.remove("btn-primary");
    $test.classList.remove("btn-success");
    $test.classList.add("btn-danger");
  }
}
