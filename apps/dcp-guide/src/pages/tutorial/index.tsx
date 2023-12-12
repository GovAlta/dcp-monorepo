import {
  GoABlock,
  GoAButton,
  GoAButtonGroup,
  GoAIcon,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import '../../styles/tutorial.css';

export default function TutorialPage() {
  const [value, setValue] = useState('');

  const onButtonClick = () => {
    console.log('first');
  };

  return (
    <>
      <div className="tutorial-container">
        <div id="anchorPoints" className="anchorPoints">
          <GoABlock direction="column" gap="3xs" alignment="start">
            <a href="#gettingStarted"> Anchor Point 1</a>
            <br />
            <a href="#starterApp"> Anchor Point 2</a>
            <br />
            <a href="#microApps"> Anchor Point 3</a>
            <br />
            <a href="#deployment"> Anchor Point 4</a>
            <br />
            <a href="#deployment"> Anchor Point 5</a>
            <br />
            <a href="#deployment"> Anchor Point 6</a>
            <br />
            <a href="#deployment"> Anchor Point 7</a>
          </GoABlock>
        </div>
        <div className="vertical-line"></div>
        <div id="tutorial-Content" className="tutorial-content">
          <GoAButton type="primary" onClick={onButtonClick}>
            Primary
          </GoAButton>
          <h2 className="resetSpacing">DCP</h2>
          DCP is a platform for digital content products. It includes shared
          libraries and micro-apps for rapid authoring and publishing of content
          with workflows for technical and non-technical writers. This monorepo
          uses the <a href="https://nx.dev/"> Nx</a> tool-stack with the
          <a href="https://github.com/nxtensions/nxtensions">
            {' '}
            @nxtensions/astro extension
          </a>{' '}
          for Astro support.
          <h3 className="borderWidth" id="gettingStarted">
            Getting Started
          </h3>
          The @nxtensions/astro extension generates projects that use targets
          matching the Astro CLI. For example, use the following command to to
          run a project in a development server:
          <br /> <br />
          <div className="code-details">npx nx dev dcp-guide</div>
          <br />
          <GoAButton type="secondary" onClick={onButtonClick}>
            Copy code
          </GoAButton>
          <br />
          This aligns to the dev Astro CLI command instead of the nx convention
          serve target. Similarly the check target is included, instead of the
          lint target, for static checks.
          <h3 className="borderWidth" id="starterApp">
            Generating an astro starter app using pre-built generator
          </h3>
          To generate an Astro app, use the following command, which utilizes a
          custom generator to create an Astro app starter kit and generate the
          necessary deployment files:
          <br /> <br />
          <div className="code-details">
            npx nx run dcp-common:gen-astro --args="--title=app-title
            --integrations=react,mdx"
          </div>
          <br />
          <GoAButton type="secondary" onClick={onButtonClick}>
            Copy code
          </GoAButton>
          <br />
          After executing the command, a basic Astro app structure will be set
          up in the "app/app-title" directory. You can proceed with customizing
          and developing your Astro app based on your specific requirements.
          <h3 className="borderWidth" id="microApps">
            Generating micro-apps on your own
          </h3>
          @nxtensions/astro extension includes generators for applications and
          libraries. Run the nx list command to see what is available:
          <br /> <br />
          <div className="code-details">npx nx list @nxtensions/astro</div>
          <br />
          <GoAButton type="secondary" onClick={onButtonClick}>
            Copy code
          </GoAButton>
          <br />
          Run the application generator to create a new micro-app:
          <br />
          <br />
          <div className="code-details">
            npx nx g @nxtensions/astro:application
          </div>
          <GoAButton type="secondary" onClick={onButtonClick}>
            Copy code
          </GoAButton>
          <h3 className="borderWidth" id="deployment">
            Deployment
          </h3>
          OpenShift manifests and deployments are maintained in source control
          and the pipeline automatically applies them during deployment stages.
          This is convention based and new applications can follow the existing
          files to adhere to conventions.
          <br />
          <br />
          Application specific manifests and supporting files are maintained
          under {'.openshift/<sub_project_name>'} with a main template in{' '}
          {'<sub_project_name>.yml'}.
          <br />
          <br />
          Apply the manifests for one environment to create the BuildConfig and
          ImageStream. For example:
          <div className="code-details">
            oc login ... oc process -f .openshift/dcp-guide/dcp-guide.yml -p
            PROJECT=dcp-dev -p DEPLOY_TAG=dev | oc apply -f -
          </div>
          <br />
          Creation of resources in downstream environments is handled by the
          pipeline when promoting new builds.
          <h3 className="borderWidth">Accessing the deployed app</h3>
          Upon app deployment, you can employ the provided URL structure to
          access it within specific environments. Please note that these URLs
          are exclusively accessible via an internal network.
          <br /> <br />
          <div className="code-details">
            dev: {'https://{app_name}-dcp-dev.apps.aro.gov.ab.ca'}
          </div>
          <br />
          <div className="code-details">
            uat: {'https://{app_name}-dcp-uat.apps.aro.gov.ab.ca'}
          </div>
          <br />
          <div className="code-details">
            prod: {'https://{app_name}-dcp-prod.apps.aro.gov.ab.ca'}
          </div>
          <br />
          As an illustration, to access the "common-capabilities" app within the
          development environment, you would use the following URL: &nbsp;
          <br />
          <a href="https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca/">
            {' '}
            https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca
          </a>
          <h3>Documentation </h3>
          <a
            href="https://github.com/GovAlta/dcp-monorepo"
            style={{ margin: '12px' }}
          >
            {' '}
            Common capabilities Github <GoAIcon size="small" type="open" />
          </a>
          <h3>Contact us</h3>
          <div className="line-elements">
            <GoAIcon type="mail" theme="outline" />
            <a
              href="mailto:TI.Softwaredelivery@ab.gov.ca?subject=Feedback for Common Capabilities"
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
          <GoAButtonGroup alignment="end">
            <GoAButton
              type="tertiary"
              trailingIcon="arrow-up-circle"
              onClick={() => console.log('clicked')}
            >
              Back to top
            </GoAButton>
          </GoAButtonGroup>
        </div>

        <div id="anchorPoints-Spacing" className="anchorPoints"></div>
      </div>
    </>
  );
}
