FROM node:18-alpine

WORKDIR /app

COPY package.json /app/
COPY . .

ENV FRONTEND_PORT 3000
ENV BACKEND_HOST backend
ENV BACKEND_PORT 4000

RUN echo 'FRONTEND_PORT=${FRONTEND_PORT}' >> .env
RUN echo 'BACKEND_HOST=${BACKEND_HOST}' >> .env
RUN echo 'BACKEND_PORT=${BACKEND_PORT}' >> .env

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT=${FRONTEND_PORT}

RUN echo 'NUXT_HOST=${NUXT_HOST}' >> .env
RUN echo 'NUXT_PORT=${BACKEND_PORT}' >> .env

EXPOSE ${FRONTEND_PORT}
EXPOSE 24678

RUN npm install

VOLUME /app/components
VOLUME /app/pages
VOLUME /app/static
VOLUME /app/store
VOLUME /app/test

CMD ["npm","run","dev"]