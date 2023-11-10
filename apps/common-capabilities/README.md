# Common Capabilities Repository

## Introduction

Common Capability refers to any component or resource that can be utilized to enhance or streamline a process, create value, or achieve a specific objective. This broad definition encompasses a variety of items, such as apps, APIs, frameworks, libraries, tools, services, platforms, and various types of requests. To maintain consistency, it is beneficial to establish criteria or characteristics defining what qualifies as a 'common capability.' These criteria may include factors like reusability, potential impact on efficiency, alignment with organizational goals, and compatibility with existing systems.

## Process to Update Common Capability

### 1. Data Capture Spreadsheet

Initially, we adopted a data capture spreadsheet to collect information. [Here](https://abgov.sharepoint.com/:x:/s/SoftwareDelivery/EaSU0hg1qglKnzZHHBmPbQsBJx6BKo_zmqNxPRNeBG10Bg) is the working version of the spreadsheet for Common Capabilities Data Capture, based on data points and functional groupings.

### 2. Self-Service Model

Moving forward, our goal is to transition to a self-service model for updating content. Here is the process:

#### Ownership and Pull Requests (PRs):

Teams or individuals can take ownership of specific capabilities and submit Pull Requests (PRs) to 'edit' the content. Access to the Git repo is granted via [https://github.com/GovAlta/dcp-monorepo](https://github.com/GovAlta/dcp-monorepo).

#### Edit datastore.json:

Submit a pull request to edit the [datastore.json](https://github.com/GovAlta/dcp-monorepo/blob/main/apps/common-capabilities/src/content/datastore.json) file for the specific capabilities to be updated.

#### DCP Team Review and Deployment:

The DCP team will conduct a brief sanity check, merge the files, and deploy them periodically.

This process ensures a collaborative and efficient approach to updating Common Capabilities, allowing teams and individuals to contribute to the repository and maintain up-to-date information.
