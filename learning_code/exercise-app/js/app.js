import { exercises } from "./exercises.js";

const STORAGE_KEY = "javascript-practice-lab-v1";

const elements = {
  exerciseList: document.querySelector("#exerciseList"),
  exerciseNumber: document.querySelector("#exerciseNumber"),
  exerciseTitle: document.querySelector("#exerciseTitle"),
  exercisePurpose: document.querySelector("#exercisePurpose"),
  requirementsList: document.querySelector("#requirementsList"),
  conceptContent: document.querySelector("#conceptContent"),
  exerciseHint: document.querySelector("#exerciseHint"),
  exerciseStatus: document.querySelector("#exerciseStatus"),
  codeEditor: document.querySelector("#codeEditor"),
  consoleOutput: document.querySelector("#consoleOutput"),
  feedback: document.querySelector("#feedback"),
  solutionPanel: document.querySelector("#solutionPanel"),
  solutionCode: document.querySelector("#solutionCode"),
  solutionExplanation: document.querySelector("#solutionExplanation"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  runButton: document.querySelector("#runButton"),
  checkButton: document.querySelector("#checkButton"),
  clearConsoleButton: document.querySelector("#clearConsoleButton"),
  resetCodeButton: document.querySelector("#resetCodeButton"),
  resetProgressButton: document.querySelector("#resetProgressButton"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      currentIndex: saved?.currentIndex ?? 0,
      completed: Array.isArray(saved?.completed) ? saved.completed : [],
      code: saved?.code && typeof saved.code === "object" ? saved.code : {},
    };
  } catch {
    return { currentIndex: 0, completed: [], code: {} };
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentExercise() {
  return exercises[state.currentIndex];
}

function renderNavigation() {
  elements.exerciseList.innerHTML = exercises
    .map((exercise, index) => {
      const isActive = index === state.currentIndex;
      const isCompleted = state.completed.includes(exercise.id);
      return `
        <li class="exercise-item">
          <button type="button" data-index="${index}" class="${isActive ? "active" : ""}">
            <span class="exercise-index">${index + 1}</span>
            <span>${exercise.title}</span>
            <span class="exercise-check">${isCompleted ? "✓" : ""}</span>
          </button>
        </li>`;
    })
    .join("");
}

function renderProgress() {
  const completedCount = state.completed.length;
  const percent = (completedCount / exercises.length) * 100;
  elements.progressText.textContent = `${completedCount} / ${exercises.length} bài hoàn thành`;
  elements.progressBar.style.width = `${percent}%`;
}

function renderExercise() {
  const exercise = currentExercise();
  const isCompleted = state.completed.includes(exercise.id);

  elements.exerciseNumber.textContent = `Bài ${state.currentIndex + 1} / ${exercises.length}`;
  elements.exerciseTitle.textContent = exercise.title;
  elements.exercisePurpose.textContent = exercise.purpose;
  elements.requirementsList.innerHTML = exercise.requirements
    .map(requirement => `<li>${requirement}</li>`)
    .join("");
  elements.conceptContent.innerHTML = exercise.concept;
  elements.exerciseHint.textContent = exercise.hint;
  elements.exerciseStatus.textContent = isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành";
  elements.exerciseStatus.classList.toggle("completed", isCompleted);
  elements.codeEditor.value = state.code[exercise.id] ?? exercise.starterCode;
  elements.consoleOutput.textContent = "Nhấn “Chạy code” để xem kết quả.";
  elements.feedback.hidden = true;
  elements.solutionPanel.open = false;
  elements.solutionCode.textContent = exercise.solution;
  elements.solutionExplanation.innerHTML = `<ul>${exercise.explanation
    .map(item => `<li>${item}</li>`)
    .join("")}</ul>`;
  elements.previousButton.disabled = state.currentIndex === 0;
  elements.nextButton.disabled = state.currentIndex === exercises.length - 1;

  renderNavigation();
  renderProgress();
}

function showFeedback(type, message) {
  elements.feedback.hidden = false;
  elements.feedback.className = `feedback ${type}`;
  elements.feedback.textContent = message;
}

function runInWorker(code, testCode) {
  return new Promise(resolve => {
    const worker = new Worker("./js/runner.js");
    const timeoutId = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, logs: [], error: "Code chạy quá 2 giây và đã được dừng." });
    }, 2000);

    worker.addEventListener("message", event => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve(event.data);
    });

    worker.addEventListener("error", event => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve({ ok: false, logs: [], error: event.message });
    });

    worker.postMessage({ code, testCode });
  });
}

function displayRunResult(result) {
  const output = [...result.logs];
  if (!result.ok) output.push(`\n${result.error}`);
  elements.consoleOutput.textContent = output.length ? output.join("\n") : "Code chạy xong nhưng chưa có output.";
}

async function runCode() {
  elements.runButton.disabled = true;
  elements.consoleOutput.textContent = "Đang chạy...";
  const result = await runInWorker(elements.codeEditor.value, "return null;");
  displayRunResult(result);
  elements.runButton.disabled = false;
}

function checkRequiredPatterns(code, requiredPatterns) {
  for (const requirement of requiredPatterns) {
    const regex = new RegExp(requirement.pattern);
    if (!regex.test(code)) return requirement.message;
  }
  return null;
}

async function checkAnswer() {
  const exercise = currentExercise();
  const code = elements.codeEditor.value;
  const patternError = checkRequiredPatterns(code, exercise.requiredPatterns);

  if (patternError) {
    showFeedback("error", patternError);
    return;
  }

  elements.checkButton.disabled = true;
  elements.consoleOutput.textContent = "Đang kiểm tra...";
  const result = await runInWorker(code, exercise.testCode);
  displayRunResult(result);
  elements.checkButton.disabled = false;

  if (!result.ok) {
    showFeedback("error", `Code đang có lỗi: ${result.error}`);
    return;
  }

  if (result.result?.passed) {
    if (!state.completed.includes(exercise.id)) state.completed.push(exercise.id);
    saveState();
    showFeedback("success", `✓ ${result.result.message}`);
    renderNavigation();
    renderProgress();
    elements.exerciseStatus.textContent = "Đã hoàn thành";
    elements.exerciseStatus.classList.add("completed");
  } else {
    showFeedback("error", result.result?.message ?? "Bài chưa đúng. Hãy kiểm tra lại code.");
  }
}

function selectExercise(index) {
  state.code[currentExercise().id] = elements.codeEditor.value;
  state.currentIndex = index;
  saveState();
  renderExercise();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.exerciseList.addEventListener("click", event => {
  const button = event.target.closest("button[data-index]");
  if (button) selectExercise(Number(button.dataset.index));
});

elements.codeEditor.addEventListener("input", () => {
  state.code[currentExercise().id] = elements.codeEditor.value;
  saveState();
});

elements.codeEditor.addEventListener("keydown", event => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = elements.codeEditor.selectionStart;
    const end = elements.codeEditor.selectionEnd;
    elements.codeEditor.setRangeText("  ", start, end, "end");
    elements.codeEditor.dispatchEvent(new Event("input"));
  }
});

elements.runButton.addEventListener("click", runCode);
elements.checkButton.addEventListener("click", checkAnswer);
elements.clearConsoleButton.addEventListener("click", () => {
  elements.consoleOutput.textContent = "Console đã được xóa.";
});
elements.resetCodeButton.addEventListener("click", () => {
  if (!window.confirm("Bạn muốn xóa code hiện tại và làm lại bài này?")) return;
  delete state.code[currentExercise().id];
  saveState();
  renderExercise();
});
elements.resetProgressButton.addEventListener("click", () => {
  if (!window.confirm("Xóa toàn bộ code và tiến độ của 4 bài?")) return;
  state = { currentIndex: 0, completed: [], code: {} };
  saveState();
  renderExercise();
});
elements.previousButton.addEventListener("click", () => selectExercise(state.currentIndex - 1));
elements.nextButton.addEventListener("click", () => selectExercise(state.currentIndex + 1));

renderExercise();
