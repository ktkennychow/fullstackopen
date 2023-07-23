FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci
ENV REACT_APP_BACKEND_URL=http://localhost:3001/
RUN npm run build

FROM build-stage as test-stage
ENV CI=true
ENV REACT_APP_BACKEND_URL=http://localhost:3001/
RUN npm run test

FROM nginx:1.20-alpine
COPY --from=test-stage /usr/src/app/build /usr/share/nginx/html


