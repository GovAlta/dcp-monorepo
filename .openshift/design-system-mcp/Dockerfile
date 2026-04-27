FROM registry.redhat.io/rhel9/nodejs-18

ARG PROJECT

COPY . .

ENV PROJECT ${PROJECT}
RUN echo "PROJECT=${PROJECT}"
CMD npm run -d service dist/apps/${PROJECT}/main.js
