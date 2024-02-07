import React from 'react';
import {
  GoAButton,
  GoAButtonGroup,
  GoAIcon,
  GoASideMenu,
  GoASpacer,
  GoAThreeColumnLayout,
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
        <h2 className="resetSpacing" id="tutorial-top">
          Developer Quickstart
        </h2>
        <GoASpacer vSpacing="xs" />
        <div className="lastUpdated">Last Updated 12/14/2023</div>
        <GoASpacer vSpacing="l" />
        DCP is a platform for digital content products. It includes shared
        libraries and micro-apps for rapid authoring and publishing of content
        with workflows for technical and non-technical writers. This monorepo
        uses the <a href="https://nx.dev/"> Nx</a> tool-stack with the{' '}
        <a href="https://github.com/nxtensions/nxtensions">
          {' '}
          @nxtensions/astro extension
        </a>{' '}
        for Astro support.
        <GoASpacer vSpacing="xl" />
        <h3 id="gettingStarted" className="resetSpacing">
          Getting Started
        </h3>
        <GoASpacer vSpacing="m" />
        The @nxtensions/astro extension generates projects that use targets
        matching the Astro CLI. For example, use the following command to to run
        a project in a development server:
        <GoASpacer vSpacing="l" />
        <div className="code-details" id="devDCPGuide">
          npx nx dev dcp-guide
        </div>
        <GoASpacer vSpacing="l" />
        This aligns to the dev Astro CLI command instead of the nx convention
        serve target. Similarly the check target is included, instead of the
        lint target, for static checks.
        <GoASpacer vSpacing="l" />
        <GoAButton
          data-testid="devDCPGuideButton"
          type="secondary"
          onClick={async () => {
            await copyToClipBoard('devDCPGuide');
          }}
        >
          Copy code
        </GoAButton>
        <GoASpacer vSpacing="xl" />
        <h3 id="starterApp" className="resetSpacing">
          Generating an astro starter app using pre-built generator
        </h3>
        <GoASpacer vSpacing="m" />
        To generate an Astro app, use the following command, which utilizes a
        custom generator to create an Astro app starter kit and generate the
        necessary deployment files:
        <GoASpacer vSpacing="l" />
        <div className="code-details" id="starterApp">
          npx nx run dcp-common:gen-astro --args="--title=app-title
          --integrations=react,mdx"
        </div>
        <GoASpacer vSpacing="l" />
        <GoAButton
          type="secondary"
          data-testid="starterAppButton"
          onClick={async () => {
            await copyToClipBoard('starterApp');
          }}
        >
          Copy code
        </GoAButton>
        <GoASpacer vSpacing="l" />
        After executing the command, a basic Astro app structure will be set up
        in the "app/app-title" directory. You can proceed with customizing and
        developing your Astro app based on your specific requirements.
        <GoASpacer vSpacing="l" />
        <h3 id="microApps" className="resetSpacing">
          Generating micro-apps on your own
        </h3>
        <GoASpacer vSpacing="m" />
        @nxtensions/astro extension includes generators for applications and
        libraries. Run the nx list command to see what is available:
        <GoASpacer vSpacing="l" />
        <div className="code-details" id="generateApps">
          npx nx list @nxtensions/astro
        </div>
        <GoASpacer vSpacing="l" />
        Run the application generator to create a new micro-app:
        <GoASpacer vSpacing="l" />
        <div className="code-details" id="runApps">
          npx nx g @nxtensions/astro:application
        </div>
        <GoASpacer vSpacing="s" />
        <h3 id="deployment" className="resetSpacing">
          Deployment
        </h3>
        <GoASpacer vSpacing="m" />
        OpenShift manifests and deployments are maintained in source control and
        the pipeline automatically applies them during deployment stages. This
        is convention based and new applications can follow the existing files
        to adhere to conventions. Application specific manifests and supporting
        files are maintained under {'.openshift/<sub_project_name>'} with a main
        template in {'<sub_project_name>.yml'}. Apply the manifests for one
        environment to create the BuildConfig and ImageStream. For example:
        <GoASpacer vSpacing="l" />
        <div className="code-details" id="openshiftManifest">
          oc login ... oc process -f .openshift/dcp-guide/dcp-guide.yml -p
          PROJECT=dcp-dev -p DEPLOY_TAG=dev | oc apply -f -
        </div>
        <GoASpacer vSpacing="l" />
        Creation of resources in downstream environments is handled by the
        pipeline when promoting new builds.
        <GoASpacer vSpacing="xl" />
        <h3 className="resetSpacing" id="accessingDeployedApp">
          Accessing the deployed app
        </h3>
        <GoASpacer vSpacing="m" />
        Upon app deployment, you can employ the provided URL structure to access
        it within specific environments. Please note that these URLs are
        exclusively accessible via an internal network.
        <GoASpacer vSpacing="l" />
        <div className="code-details">
          dev: {'https://{app_name}-dcp-dev.apps.aro.gov.ab.ca'}
        </div>
        <div className="code-details">
          uat: {'https://{app_name}-dcp-uat.apps.aro.gov.ab.ca'}
        </div>
        <div className="code-details">
          prod: {'https://{app_name}-dcp-prod.apps.aro.gov.ab.ca'}
        </div>
        <GoASpacer vSpacing="l" />
        As an illustration, to access the "common-capabilities" app within the
        development environment, you would use the following URL:
        <GoASpacer vSpacing="xs" />
        <a
          href="https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca/"
          data-testid="commonCapabilitiesLink"
        >
          https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca
        </a>
        <GoASpacer vSpacing="xl" />
        <h3 id="documentation" className="resetSpacing">
          Documentation
        </h3>
        <GoASpacer vSpacing="m" />
        <a href="https://github.com/GovAlta/dcp-monorepo">
          Common capabilities Github <GoAIcon size="small" type="open" />
        </a>
        <GoASpacer vSpacing="xl" />
        <h3 className="resetSpacing" id="contactUs">
          Contact us
        </h3>
        <GoASpacer vSpacing="m" />
        <div className="line-elements">
          <GoAIcon type="mail" theme="outline" />
          <a
            href="mailto:TI.Softwaredelivery@gov.ab.ca?subject=Feedback for Common Capabilities"
            data-testid="emailToLink"
            style={{ margin: '12px' }}
          >
            {' '}
            Common capabilities team <GoAIcon size="small" type="open" />
          </a>
        </div>
        <GoASpacer vSpacing="xl" />
        <h3 className="resetSpacing" id="slackSupport">
          Slack support channel{' '}
        </h3>
        <GoASpacer vSpacing="m" />
        <div className="line-elements">
          <GoAIcon type="logo-slack" theme="outline" />
          <a
            href="https://goa-dio.slack.com/channels/commoncapabilities"
            style={{ margin: '12px' }}
          >
            Common capabilities team <GoAIcon size="small" type="open" />
          </a>
        </div>
        <GoASpacer vSpacing="3xl" />
        <GoAButtonGroup alignment="end">
          <a href="#tutorial-top">
            <GoAButton
              data-testid="backToTopButton"
              type="tertiary"
              trailingIcon="arrow-up-circle"
            >
              Back to top
            </GoAButton>
          </a>
        </GoAButtonGroup>
        <GoASpacer vSpacing="4xl" />
      </>
    );
  };

  const renderAnchorPoints = () => {
    return (
      <>
        <GoASideMenu>
          <a href="#gettingStarted" data-testid="gettingStarted">
            Getting Started
          </a>
          <a href="#starterApp" data-testid="starterApp">
            Anchor Point 2
          </a>
          <a href="#microApps" data-testid="microApps">
            Anchor Point 3
          </a>
          <a href="#accessingDeployedApp" data-testid="accessingDeployedApp">
            Anchor Point 4
          </a>
          <a href="#documentation" data-testid="documentation">
            Anchor Point 5
          </a>
          <a href="#contactUs" data-testid="contactUs">
            Anchor Point 6
          </a>
          <a href="#slackSupport" data-testid="slackSupport">
            Anchor Point 7
          </a>
        </GoASideMenu>
      </>
    );
  };

  return (
    <>
      <GoAThreeColumnLayout
        nav={renderAnchorPoints()}
        side-menu={
          <>
            <h2>Side Menu</h2>
            <p>Add in your content here.</p>
          </>
        }
      >
        {renderContents()}
      </GoAThreeColumnLayout>
    </>
  );
}
