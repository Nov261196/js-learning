export function runJavaScript(code, testCode = "return null;") {
  return new Promise(resolve => {
    const worker = new Worker("./js/worker.js", { type: "module" });
    const timeout = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, logs: [], error: "Code chạy quá 2 giây nên đã dừng." });
    }, 2000);
    worker.addEventListener("message", event => {
      clearTimeout(timeout);
      worker.terminate();
      resolve(event.data);
    }, { once: true });
    worker.addEventListener("error", event => {
      clearTimeout(timeout);
      worker.terminate();
      resolve({ ok: false, logs: [], error: event.message });
    }, { once: true });
    worker.postMessage({ code, testCode });
  });
}
