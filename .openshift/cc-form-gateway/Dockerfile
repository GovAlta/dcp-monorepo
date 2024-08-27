FROM registry.redhat.io/rhel9/nodejs-18

COPY ./dist/apps/${PROJECT} .

CMD npm run -d service dist/apps/${PROJECT}/main.js