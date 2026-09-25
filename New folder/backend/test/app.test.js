import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createApp } from "../app.js";
import { prisma } from "../lib/prisma.js";

process.env.JWT_SECRET = "test-secret-that-is-at-least-32-characters-long";

let baseUrl;
let server;

before(async () => {
  const app = createApp();
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  await prisma.$disconnect();
});

test("unknown API returns a JSON 404 response", async () => {
  const response = await fetch(`${baseUrl}/api/does-not-exist`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { message: "Không tìm thấy API này." });
});

test("protected progress route requires authentication", async () => {
  const response = await fetch(`${baseUrl}/api/progress`);

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { message: "Hãy đăng nhập để tiếp tục." });
});

test("login validates missing credentials without querying the database", async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { message: "Nhập email và mật khẩu để đăng nhập." });
});

test("login handles a request without a JSON body", async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`, { method: "POST" });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { message: "Nhập email và mật khẩu để đăng nhập." });
});

test("root serves the learning application", async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
});

test("serves the frontend from the learning_code prefix", async () => {
  const response = await fetch(`${baseUrl}/learning_code/index.html`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
});

test("serves the frontend course data", async () => {
  const response = await fetch(`${baseUrl}/learning_code/scripts/data/course.data.js`);

  assert.equal(response.status, 200);
  assert.match(await response.text(), /courseModules/);
});

test("serves the browser favicon without a 404", async () => {
  const response = await fetch(`${baseUrl}/favicon.ico`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/svg\+xml/);
});

test("known API with the wrong method returns 405 and Allow", async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`);

  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST, OPTIONS");
  assert.deepEqual(await response.json(), {
    message: "Phương thức GET không được hỗ trợ cho API này.",
    allowedMethods: ["POST"],
  });
});

test("frontend routes fall back to index.html", async () => {
  const response = await fetch(`${baseUrl}/courses/javascript`);

  assert.equal(response.status, 200);
  assert.match(await response.text(), /id="app"/);
});

test("accepts Laragon preflight requests", async () => {
  const origin = "http://vudn.test";
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "OPTIONS",
    headers: {
      Origin: origin,
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "content-type",
    },
  });

  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
  assert.equal(response.headers.get("access-control-allow-credentials"), "true");
});
