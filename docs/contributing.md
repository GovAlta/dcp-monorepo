# Welcome to the Digital Content Platform (DCP) Contributing Guid

## What is the DCP?

ADSP's digital content platform is a place for, well, digital content! Its where DDD teams can build and deploy
websites for use within the organization, providing information to people within the Government of Alberta about various things like:
- Application overviews,
- Application user guides and tutorials,
- New application functionality
- Application FAQs
- DDD development standards and guidelines
- Team development standards and guidelines
- Technology concepts and implementations

It is meant to be a home for static websites, for _information sharing_ rather than _information processing_.

DCP is organized as a set of independent microsites, each with a specific purpose.  The only thing they have in common is that they share 
- The Static Site Generator technology ([Astro](https://docs.astro.build/en/getting-started/)), 
- a git repository, and 
- common deployment scripts.  

These technologies allow site developers to quickly get their content up and deployed.

## When should you use it?

There are several places in DDD where you can share information, including [Confluence](https://goa-dio.atlassian.net/wiki/spaces/DIO/pages/355139654/Start+your+journey+here-+welcome+to+3D). So how can you decide if you should build a static website or just use confluence pages?  Here are some guidelines:

Use DCP if
- your audience is wider than DDD,
- you want to tell your story without the unrelated distractions of other people's stuff,
- you want to provide a unique browsing experience to your audience,
- presentation is important,
- you need full control over your site and its content.

Use Confluence
- if the information you are sharing is expected to have a limited TTL or audience,
- if you are not concerned about presentation and style,
- if you need a very quick turnaround; Confluence is immediate.

## Contribution Guidelines

A contributor is anyone who adds content to one or more of the micro-sites in DCP.There are two kinds of contributors; those who will initially set up the project structure, and those who will contribute content in the form of HTML or markdown.

### Creating a new project

Those who want to create a new project, or microsite, should first determine if DCP is the right choice (see above) for their needs. They should have enough technical expertise to understand

- the basic organization for Static Site generators,
- [Astro](https://docs.astro.build/en/getting-started/),
- deployment scripts

and have already secured a valid domain for their site.

#### Site Generation
TBD

### Contributing Content

Normally you would only make contributions to a microsite if your team or ministry is building and supporting it. You should have enough technical expertise to 
- use git and Github,
- use either HTML or markdown for content layout and formatting.

#### Avoid PR Spam

DCP is a monorepo, meaning it contains several micro-sites which, in turn, means that the potential for developers
to get spammed with PR's that do not interest them is real.  You can minimize the amount of PR spam you get by using
labels in git, e.g.

- Create a github label for your project in the dcp repository. e.g. cs-irc,
- Whenever you create a PR, label it with the above
- When viewing PR’s in Github, you can search for label:cs-irc to see all the PR’s for your group

You can even do something similar when integrating git notifications into slack, i.e. [filtering them by label](https://nira.com/github-slack-integration/).
