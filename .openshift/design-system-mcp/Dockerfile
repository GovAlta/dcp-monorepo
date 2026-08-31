FROM registry.redhat.io/rhel9/nodejs-18

ARG PROJECT=design-system-mcp

USER 0

WORKDIR /app

COPY dist/apps/${PROJECT}/ .

RUN npm install --omit=dev --ignore-scripts

USER 1001

CMD node main.js
