import React, { useState } from 'react';
import {
  GoABlock,
  GoAButton,
  GoAButtonGroup,
  GoAIcon,
} from '@abgov/react-components';
import '../../styles/global.css';

export default function TutorialPage() {
  const copyToClipBoard = async (id: string) => {
    const copyText = document.getElementById(id);
    if (copyText) {
      await navigator.clipboard.writeText(copyText.innerText);
    }
    await navigator.clipboard.readText();
  };

  const renderContents = () => {
    return (
      <>
        <h2 className="resetSpacing">Developer Quickstart</h2>
        <div className="padding-bottom-l"></div>
        <div className="padding-bottom-l">
          <div className="lastUpdated">Last Updated 12/14/2023</div>
        </div>
        <div className="padding-bottom-l">
          DCP is a platform for digital content products. It includes shared
          libraries and micro-apps for rapid authoring and publishing of content
          with workflows for technical and non-technical writers. This monorepo
          uses the <a href="https://nx.dev/"> Nx</a> tool-stack with the{' '}
          <a href="https://github.com/nxtensions/nxtensions">
            {' '}
            @nxtensions/astro extension
          </a>{' '}
          for Astro support.
        </div>
        <div className="padding-bottom-xl">
          <h3 className="borderWidth" id="gettingStarted">
            Getting Started
          </h3>
          The @nxtensions/astro extension generates projects that use targets
          matching the Astro CLI. For example, use the following command to to
          run a project in a development server:
        </div>
        <div className="code-details" id="devDCPGuide">
          npx nx dev dcp-guide
        </div>
        <div className="padding-bottom-l"></div>
        <div className="padding-bottom-l">
          This aligns to the dev Astro CLI command instead of the nx convention
          serve target. Similarly the check target is included, instead of the
          lint target, for static checks.
        </div>
        <div className="padding-bottom-l">
          <GoAButton
            testid="devDCPGuideButton"
            type="secondary"
            onClick={async () => {
              await copyToClipBoard('devDCPGuide');
            }}
          >
            Copy code
          </GoAButton>
        </div>
        <h3 className="borderWidth" id="starterApp">
          Generating an astro starter app using pre-built generator
        </h3>
        <div className="padding-bottom-l">
          To generate an Astro app, use the following command, which utilizes a
          custom generator to create an Astro app starter kit and generate the
          necessary deployment files:
        </div>
        <div className="code-details" id="starterApp">
          npx nx run dcp-common:gen-astro --args="--title=app-title
          --integrations=react,mdx"
        </div>
        <div className="padding-bottom-l"></div>
        <div className="padding-bottom-l">
          <GoAButton
            type="secondary"
            testid="starterAppButton"
            onClick={async () => {
              await copyToClipBoard('starterApp');
            }}
          >
            Copy code
          </GoAButton>
        </div>
        After executing the command, a basic Astro app structure will be set up
        in the "app/app-title" directory. You can proceed with customizing and
        developing your Astro app based on your specific requirements.
        <h3 className="borderWidth" id="microApps">
          Generating micro-apps on your own
        </h3>
        <div className="padding-bottom-l">
          @nxtensions/astro extension includes generators for applications and
          libraries. Run the nx list command to see what is available:
        </div>
        <div className="padding-bottom-l">
          <div className="code-details" id="generateApps">
            npx nx list @nxtensions/astro
          </div>
        </div>
        <div className="padding-bottom-l">
          <GoAButton
            type="secondary"
            testid="generateAppsButton"
            onClick={async () => {
              await copyToClipBoard('generateApps');
            }}
          >
            Copy code
          </GoAButton>
        </div>
        <div className="padding-bottom-l">
          Run the application generator to create a new micro-app:
        </div>
        <div className="padding-bottom-l">
          <div className="code-details" id="runApps">
            npx nx g @nxtensions/astro:application
          </div>
        </div>
        <div className="padding-bottom-l">
          <GoAButton
            type="secondary"
            testid="runAppsButton"
            onClick={async () => {
              await copyToClipBoard('runApps');
            }}
          >
            Copy code
          </GoAButton>
        </div>
        <h3 className="borderWidth" id="deployment">
          Deployment
        </h3>
        <div className="padding-bottom-l">
          OpenShift manifests and deployments are maintained in source control
          and the pipeline automatically applies them during deployment stages.
          This is convention based and new applications can follow the existing
          files to adhere to conventions. Application specific manifests and
          supporting files are maintained under{' '}
          {'.openshift/<sub_project_name>'} with a main template in{' '}
          {'<sub_project_name>.yml'}. Apply the manifests for one environment to
          create the BuildConfig and ImageStream. For example:
        </div>
        <div className="padding-bottom-l">
          <div className="code-details" id="openshiftManifest">
            oc login ... oc process -f .openshift/dcp-guide/dcp-guide.yml -p
            PROJECT=dcp-dev -p DEPLOY_TAG=dev | oc apply -f -
          </div>
        </div>
        <div className="padding-bottom-l">
          Creation of resources in downstream environments is handled by the
          pipeline when promoting new builds.
        </div>
        <div className="padding-bottom-l">
          <GoAButton
            type="secondary"
            onClick={async () => {
              await copyToClipBoard('openshiftManifest');
            }}
          >
            Copy code
          </GoAButton>
        </div>
        <div className="padding-bottom-l">
          <h3 className="borderWidth">Accessing the deployed app</h3>
          Upon app deployment, you can employ the provided URL structure to
          access it within specific environments. Please note that these URLs
          are exclusively accessible via an internal network.
        </div>
        <div className="padding-bottom-l">
          <div className="code-details">
            dev: {'https://{app_name}-dcp-dev.apps.aro.gov.ab.ca'}
          </div>
          <div className="code-details">
            uat: {'https://{app_name}-dcp-uat.apps.aro.gov.ab.ca'}
          </div>
          <div className="code-details">
            prod: {'https://{app_name}-dcp-prod.apps.aro.gov.ab.ca'}
          </div>
        </div>
        As an illustration, to access the "common-capabilities" app within the
        development environment, you would use the following URL: <br />
        <a
          href="https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca/"
          data-testid="commonCapabilitiesLink"
        >
          https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca
        </a>
        <h3 id="documentation">Documentation </h3>
        <a href="https://github.com/GovAlta/dcp-monorepo">
          Common capabilities Github <GoAIcon size="small" type="open" />
        </a>
        <h3>Contact us</h3>
        <div className="line-elements">
          <GoAIcon type="mail" theme="outline" />
          <a
            href="mailto:TI.Softwaredelivery@ab.gov.ca?subject=Feedback for Common Capabilities"
            data-testid="emailToLink"
            style={{ margin: '12px' }}
          >
            {' '}
            Common capabilities team <GoAIcon size="small" type="open" />
          </a>
        </div>
        <h3>Slack support channel </h3>
        <div className="line-elements">
          <GoAIcon type="logo-slack" theme="outline" />
          <a
            href="https://goa-dio.slack.com/channels/commoncapabilities"
            style={{ margin: '12px' }}
          >
            {' '}
            Common capabilities team <GoAIcon size="small" type="open" />
          </a>
        </div>
        <div className="padding-bottom-3xl"></div>
        <GoAButtonGroup alignment="end">
          <a href="#tutorial-top">
            <GoAButton
              testid="backToTopButton"
              type="tertiary"
              trailingIcon="arrow-up-circle"
            >
              Back to top
            </GoAButton>
          </a>
        </GoAButtonGroup>
      </>
    );
  };

  const renderAnchorPoints = () => {
    return (
      <>
        <GoABlock direction="column" gap="3xs" alignment="start">
          <a href="#gettingStarted" testid="anchorPoint1">
            {' '}
            Anchor Point 1
          </a>
          <br />
          <a href="#starterApp" data-testid="anchorPoint2">
            {' '}
            Anchor Point 2
          </a>
          <br />
          <a href="#microApps" data-testid="anchorPoint3">
            {' '}
            Anchor Point 3
          </a>
          <br />
          <a href="#deployment" data-testid="anchorPoint4">
            {' '}
            Anchor Point 4
          </a>
          <br />
          <a href="#deployment" data-testid="anchorPoint5">
            {' '}
            Anchor Point 5
          </a>
          <br />
          <a href="#deployment" data-testid="anchorPoint6">
            {' '}
            Anchor Point 6
          </a>
          <br />
          <a href="#documentation" data-testid="anchorPoint7">
            {' '}
            Anchor Point 7
          </a>
        </GoABlock>
      </>
    );
  };

  return (
    <>
      <div className="tutorial-container" id="tutorial-top">
        <div id="anchorPoints" className="anchorPoints">
          {renderAnchorPoints()}
        </div>
        <div className="vertical-line"></div>
        <div id="tutorial-Content" className="tutorial-content">
          {renderContents()}
        </div>

        <div id="anchorPoints-Spacing" className="anchorPoints"></div>
      </div>
    </>
  );
}
