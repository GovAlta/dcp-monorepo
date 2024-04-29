import {
  GoAThreeColumnLayout,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
import { string, type any } from 'astro/zod';

interface DetailsProps {
  app: any;
  fields: any;  
}

export default function Details({ app, fields}: DetailsProps): JSX.Element {
  const [items, setItems] = useState<any>({
    badges: [],
    content: [],
  });

  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);

  
  const getDisplayName = (myFieldList: FieldItem[], fName: string) => {
    const tmp = myFieldList.find((item: FieldItem) => item.FieldName === fName);
    if (tmp !== undefined) {
      return tmp.Display;      
    }
    return fName;
  };

  interface FieldItem { FieldName: string; Display: string; Note: string; Group: string; Show: boolean; DataType: string; Filter:string; css:string }

  interface SecurityProps {
    fieldList: FieldItem[];
    group: {Type:string; Items: any[]}
  }

  const SecurityBlock: React.FC<SecurityProps> = ({ fieldList, group }) => {
    const tmp = fieldList.find((items: FieldItem) => items.FieldName === 'Security'+group.Type);
    if (tmp == undefined) {
      return (<h4 className='tbd'>{'Missing: Security '+group.Type}</h4>)    
    }        
    let groupName: string = tmp.Display;
    let tableTH: string[] = [];
    const openBracketIndex = tmp.Display.indexOf('(');
    const closeBracketIndex = tmp.Display.indexOf(')');    
    if (openBracketIndex !== -1 && closeBracketIndex !== -1) {
      groupName = tmp.Display.substring(0, openBracketIndex);
      tableTH = tmp.Display.substring(openBracketIndex + 1, closeBracketIndex).split(',');      
    }
  
    return (<>
          <span className='security-group'> {groupName} </span>
          {(tmp.Note !== '' ? <div className='security-group-note'> {tmp.Note} </div> : <></>)}
          <table className="security-table">
            <tbody>
              {(tableTH.length > 0 
              ? <tr><th colSpan={2}>{tableTH[0]} </th><th>{tableTH[1]} </th></tr>  
              : <tr><th colSpan={3}></th></tr>
              )}
              { group.Items.map((item :any) => (            
              <tr><td> {getDisplayName(fields, item.Field)}  </td> <td></td>
              <td className={'service-content '+ tmp.css.replace('[value]', item.Value)}> {item.Value}  </td></tr>
              )) }
            </tbody>
            </table>        
        </>      
    );  
  }
 
  const renderContact = (method: any) => {
    const contactMethods: any = {
      Slack: {      iconType: 'logo-slack',   linkPrefix: ''       },
      Email: {      iconType: 'mail',         linkPrefix: 'mailto:'},
      Phone: {      iconType: 'call',         linkPrefix: 'tel:'   },
      BERNIE: {     iconType: 'cart',         linkPrefix: ''       },
      Web:   {      iconType: 'globe',        linkPrefix: ''       },
      Sharepoint: { iconType: 'share-social', linkPrefix: ''       },
      Github: {     iconType: 'logo-github',  linkPrefix: ''       },
    };
    const methodConfig = contactMethods[method.type] || {};
    const iconType = methodConfig.iconType || '';
    const linkPrefix = methodConfig.linkPrefix || '';

    return (
      <tr className="items-color">
        <td className="contact-type">{`${method.type}:  `}</td>
        <td>
          <GoAIcon type={iconType} size="small" theme="outline" />
        </td>
        <td className="td-links">
          <ExternalLink
            link={`${linkPrefix}${method.url}`}
            text={method.value}
          />
        </td>
      </tr>
    );
  };

  const renderContent = (name: string, app: any, fields: FieldItem[], DataType: string, css: string) => {
    //if (DataType === 'urlArray' && app.Documentation.length > 0) {
    if (DataType === 'urlArray') {
      return app[name].map((doc: any) => (
        <div>
          <ExternalLink text={`${doc.name}`} link={doc.url} />
          <GoASpacer vSpacing="s" />
        </div>
      ));
    }
 
    else if (name === 'Specifications' || DataType === 'Specs()' ) {
      return (
        <table className="security-specs">
        <tbody>        
          {app.InternalWeightage > 49 ? (<tr><td colSpan={3}> <GoABadge key="Recommended" type="midtone" content="Recommended" /> </td></tr>) : ('')}
          {fieldsSpec.map(({ FieldName, Display, id, DataType, css }: any) => (
          <tr key={id}>
            <td>{Display}</td>
            <td>
              <span className={css.replace('[value]', app[FieldName])}>
              { DataType === 'textArray' ? app[FieldName].join(", ") : app[FieldName] }
              </span></td>
            </tr>
          ))}
        </tbody>
        </table>
      );
    }

    else if (name === 'Contact') {
      return (
        <table className="contact-table">
          <tbody>
            {app.Contact.methods.map((method: any) => renderContact(method))}
          </tbody>
        </table>
      );
    }

    else if (name === 'Security') {
      return (<>
      <div className='security'>        
        { app.Security.map((sGroup :any) => (
          <SecurityBlock group={sGroup} fieldList={fields} />
          )) }
      </div>
      </> );
    }

    else if (DataType === 'textArray')          
      return <p className="service-content">{app[name].join(", ")} </p>;

    else    
      return <p className={'service-content '+ css.replace('[value]', app[name])}>{app[name]}</p>;
  };
  
  interface FieldPlus extends FieldItem { id: string; } // Show: boolean;

  const filteredFields = (fields: FieldItem[], filterCondition: string): FieldPlus[] => {
    return fields.filter((item: FieldItem) =>
       item.Group === filterCondition && (item.DataType.indexOf('(') > 0
        || app[item.FieldName].length > 0 
        || (item.FieldName === 'Contact' && app.Contact.methods.length > 0) ))
    .map((obj: FieldItem) => ({
         ...obj
         ,id: 'myservice-' + obj.FieldName        
       }));
  };

  const fieldsBody: FieldPlus[] = filteredFields(fields, 'Body');
  const fieldsTop:  FieldPlus[] = filteredFields(fields, 'Top');
  const fieldsSpec: FieldPlus[] = filteredFields(fields, 'Spec');

  return (
    <>
      <GoAThreeColumnLayout
        nav= {
          <div className="details-side-nav">           
            <GoASideMenu>           
              { fieldsBody.map((content: any) => {
                  return ( <a key={`${content.id}`} href={`#${content.id}`}> {content.Display} </a> );
                  })
              }
            </GoASideMenu>
            <br/><br/> (hide menu when printing)
          </div>
        }
       >        
        <GoASpacer vSpacing="xs" />        
        {fieldsTop.map(({ FieldName, DataType, css }: any) => (
          <div>
             <span className={'service-content '+ css.replace('[value]', app[FieldName])}>
             {DataType === 'textArray' ? app[FieldName].join(", ") : app[FieldName]}
             </span>
             </div>
           ))
        }
        <GoASpacer vSpacing="xl" />
        {fieldsBody.map(({ FieldName, Display, id, DataType,css }: any) => {            
            return (
              <div key={`${id}`}>
                <h3 id={`${id}`}>{Display} </h3>
                {renderContent(FieldName, app, fields, DataType, css)}
                <GoASpacer vSpacing="l" />
              </div>              
            );
          })}

        <GoASpacer vSpacing="3xl" />

        <div className="line-elements back-top">
          <a href="#top-page">Back to top</a>
          <GoAIcon type="arrow-up-circle" theme="outline" />
        </div>
      </GoAThreeColumnLayout>
    </>
  );
}