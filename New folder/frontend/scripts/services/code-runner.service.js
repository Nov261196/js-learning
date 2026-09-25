const TIMEOUT_MS = 2_000;

export function runJavaScript(code, testCode = "return null;") {
  return new Promise((resolve) => {
    const workerUrl = new URL("../workers/code-runner.worker.js", import.meta.url);
    const worker = new Worker(workerUrl, { type: "module" });
    const finish = (result) => {
      clearTimeout(timeout);
      worker.terminate();
      resolve(result);
    };
    const timeout = setTimeout(
      () => finish({ ok: false, logs: [], error: "Code chạy quá 2 giây nên đã dừng." }),
      TIMEOUT_MS,
    );

    worker.addEventListener("message", (event) => finish(event.data), { once: true });
    worker.addEventListener(
      "error",
      (event) => finish({ ok: false, logs: [], error: event.message }),
      { once: true },
    );
    worker.postMessage({ code, testCode });
  });
}
