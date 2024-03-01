import React, { useEffect, useState } from 'react';
import {
  GoAFormItem,
  GoAInput,
  GoADropdown,
  GoADropdownItem,
  GoATextArea,
  GoAButtonGroup,
  GoAButton,
  GoAAccordion,
  GoAIcon,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components';
import './styles.css';
// import faqs from './faq.json';
import ExternalLink from '../../components/ExternalLink';

export default function ContactPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  });

  const [value, setValue] = useState<string>("");

  function onChange(name: string, value: string) {
    setValue(value);
  }

  const [value2, setValue2] = useState("");
  function onChange2(name: string, value: string | string[]) {
    setValue(value2);
  }
  const [value3, setValue3] = useState<string>("");

  function onChange3(name: string, value: string) {
    setValue(value);
  }

  function onClick(name: string, value: string) {
    console.log(name,value);
  }

  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAThreeColumnLayout>
        <h2>Common capabilities contact</h2>
        We need to create some text that lets people know that this is for the Common Capabilities listings site and not the capabilities themselves. For that, a person would have to refer to the contact on the listing.
        
        <GoASpacer vSpacing="2xl" />

        <GoAFormItem label="Name">
          <GoAInput value="" name="Name" type="text" onChange={onChange} width="100%"></GoAInput>
        </GoAFormItem>
        <GoAFormItem label="Email">
          <GoAInput value="" name="Email" type="email" onChange={onChange} width="100%"></GoAInput>
        </GoAFormItem>

        <GoAFormItem label="What is it about" requirement="optional">
          <GoADropdown name="item" onChange={onChange2} width="100%">
            <GoADropdownItem value="question"   label="Question"></GoADropdownItem>
            <GoADropdownItem value="bug"        label="Bug"></GoADropdownItem>            
            <GoADropdownItem value="suggestion" label="Suggestion"></GoADropdownItem>
          </GoADropdown>
        </GoAFormItem>


        <GoAFormItem label="Brief description" helpText="helper text goes here + the number of characters remaining" >
          <GoATextArea type="basic" name="item" onChange={onChange3}></GoATextArea>
        </GoAFormItem>
        

        <GoAButtonGroup alignment="start" mt="l">
          <GoAButton type="primary" onClick={onClick} disabled="true">
            Send
          </GoAButton>
        </GoAButtonGroup>

        <GoASpacer vSpacing="2xl" />
        <GoASpacer vSpacing="2xl" />

        {/* <div className="line-elements">
          <GoAIcon type="mail" theme="outline" />
          <ExternalLink
            link="mailto:TI.Softwaredelivery@gov.ab.ca?subject=Feedback for Common Capabilities"
            text="Common capabilities team"
          />
        </div> */}
        <h3>Teams support channel </h3>
        <div className="line-elements">
          <GoAIcon type="person" theme="outline" />
          <ExternalLink
            link="https://teams.microsoft.com/l/channel/19%3aTzamGNMm-n21VoLqbCiU68hxpp3TuCKVAqHurh78-j01%40thread.tacv2/General?groupId=169394f7-780d-40eb-ab1e-a0b68b828b76&tenantId=2bb51c06-af9b-42c5-8bf5-3c3b7b10850b"
            text="Common capabilities team"
          />
        </div>

      </GoAThreeColumnLayout>
    </div>
  );
}
