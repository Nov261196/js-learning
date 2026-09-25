import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { validateEnvironment } from "./utils/environment.js";
import { allowFrontendOrigin } from "./middleware/cors.middleware.js";
import { handleError, notFoundApi } from "./middleware/error.middleware.js";
import { handleUnsupportedApiMethod } from "./middleware/method-not-allowed.middleware.js";
import apiRoutes from "./routes/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  validateEnvironment();

  const app = express();
  const publicDirectory = process.env.PUBLIC_DIR ?? path.resolve(here, "../frontend");

  app.disable("x-powered-by");
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(allowFrontendOrigin);
  app.use(express.json({ limit: "512kb" }));
  app.use(cookieParser());

  app.use("/api", apiRoutes);
  app.use("/api", handleUnsupportedApiMethod);
  app.use("/api", notFoundApi);

  app.get("/favicon.ico", (_request, response) => {
    response.sendFile(path.join(publicDirectory, "public/favicon/favicon.svg"));
  });
  app.use("/learning_code", express.static(publicDirectory, { extensions: ["html"] }));
  app.use(express.static(publicDirectory, { extensions: ["html"] }));
  app.get("*", (request, response, next) => {
    if (path.extname(request.path) || !request.accepts("html")) return next();
    return response.sendFile(path.join(publicDirectory, "index.html"));
  });

  app.use(handleError);
  return app;
}
