self.addEventListener("message", event => {
  const { code, testCode = "return null;" } = event.data;
  const logs = [];

  const formatValue = value => {
    if (typeof value === "string") return value;
    if (typeof value === "undefined") return "undefined";
    if (typeof value === "function") return value.toString();

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  const fakeConsole = {
    log: (...values) => logs.push(values.map(formatValue).join(" ")),
    warn: (...values) => logs.push(`[warn] ${values.map(formatValue).join(" ")}`),
    error: (...values) => logs.push(`[error] ${values.map(formatValue).join(" ")}`),
  };

  try {
    const execute = new Function(
      "console",
      "__logs",
      `"use strict";\n${code}\n${testCode}`,
    );
    const result = execute(fakeConsole, logs);
    self.postMessage({ ok: true, logs, result });
  } catch (error) {
    self.postMessage({
      ok: false,
      logs,
      error: `${error.name}: ${error.message}`,
    });
  }
});
