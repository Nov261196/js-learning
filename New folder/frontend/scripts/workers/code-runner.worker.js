self.addEventListener("message", event => {
  const { code, testCode = "return null;" } = event.data;
  const logs = [];
  const format = value => {
    if (typeof value === "string" || typeof value === "undefined") return String(value);
    try { return JSON.stringify(value); } catch { return String(value); }
  };
  const consoleProxy = {
    log: (...values) => logs.push(values.map(format).join(" ")),
    warn: (...values) => logs.push(`[warn] ${values.map(format).join(" ")}`),
    error: (...values) => logs.push(`[error] ${values.map(format).join(" ")}`),
  };
  try {
    const execute = new Function("console", "__logs", `"use strict";\n${code}\n${testCode}`);
    self.postMessage({ ok: true, logs, result: execute(consoleProxy, logs) });
  } catch (error) {
    self.postMessage({ ok: false, logs, error: `${error.name}: ${error.message}` });
  }
});
