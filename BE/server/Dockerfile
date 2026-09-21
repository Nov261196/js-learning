FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY BE/server/package.json ./server/package.json
RUN cd server && npm install --omit=dev --no-audit --no-fund
COPY BE/server/src ./server/src

COPY FE/exercise-app/index.html ./public/learning_code/exercise-app/index.html
COPY FE/exercise-app/css ./public/learning_code/exercise-app/css
COPY FE/exercise-app/js ./public/learning_code/exercise-app/js
COPY FE/module-01-fundamentals ./public/learning_code/module-01-fundamentals
COPY FE/module-02-functions ./public/learning_code/module-02-functions
COPY FE/module-03-arrays-objects ./public/learning_code/module-03-arrays-objects
COPY FE/module-04-es6 ./public/learning_code/module-04-es6
COPY FE/module-05-array-methods ./public/learning_code/module-05-array-methods
COPY FE/module-06-advanced-functions ./public/learning_code/module-06-advanced-functions
COPY FE/module-07-modules ./public/learning_code/module-07-modules
COPY FE/module-08-dom ./public/learning_code/module-08-dom
COPY FE/module-09-events-forms ./public/learning_code/module-09-events-forms
COPY FE/module-10-async-js ./public/learning_code/module-10-async-js
COPY FE/module-11-promises ./public/learning_code/module-11-promises
COPY FE/module-12-async-await ./public/learning_code/module-12-async-await
COPY FE/module-13-api-fetch ./public/learning_code/module-13-api-fetch
COPY FE/module-14-browser-storage ./public/learning_code/module-14-browser-storage
COPY FE/module-15-javascript-practice ./public/learning_code/module-15-javascript-practice
COPY FE/module-16-react-preparation ./public/learning_code/module-16-react-preparation

WORKDIR /app/server
EXPOSE 3000
HEALTHCHECK --interval=20s --timeout=3s --start-period=20s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["npm", "start"]

