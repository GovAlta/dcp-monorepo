import {
  GoAThreeColumnLayout,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
  GoATable,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
//import { string, type any } from 'astro/zod';
import {fieldList} from './config';

interface DetailsProps {
  app: any;
}

export default function Details({ app}: DetailsProps): JSX.Element {

  const [items, setItems] = useState<any>({    
    fieldsTop: [],
    fieldsSpec: [],
    fieldsBody: []
  });

  const [fields, setFields] = useState<any>([]);

  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);


  useEffect(() => {
    const fields: any[] = fieldList;
    setFields(fieldList)

    setItems({
      fieldsBody: filteredFields(fields, 'Body'),
      fieldsTop: filteredFields(fields, 'Top'),
      fieldsSpec: filteredFields(fields, 'Spec')      
    });
  }, []);

//====================================================

  const getDisplayName = (myFieldList: FieldItem[], fName: string) => {
    const tmp = myFieldList.find((item: FieldItem) => item.property === fName);
    if (tmp !== undefined) {
      return tmp.title;      
    }
    return fName;
  };

  interface FieldItem { property: string; title: string; note: string; group: string; Show: boolean; dataType: string; filter:string; css:string }

  interface SecurityProps {
    fieldList: FieldItem[];
    group: {Type:string; Items: any[]}
  }

  const SecurityBlock: React.FC<SecurityProps> = ({ fieldList, group }) => {
    const tmp = fieldList.find((items: FieldItem) => items.property === 'Security'+group.Type);
    
    if (tmp == undefined) {
      return ( <> <GoABadge key="Recommended" type="emergency"   content={'Missing: '+group.Type} /> </>)
    }        
    let groupName: string = tmp.title;
    let tableTH: string[] = [];
    const openBracketIndex = tmp.title.indexOf('(');
    const closeBracketIndex = tmp.title.indexOf(')');    
    if (openBracketIndex !== -1 && closeBracketIndex !== -1) {
      groupName = tmp.title.substring(0, openBracketIndex);
      tableTH = tmp.title.substring(openBracketIndex + 1, closeBracketIndex).split(',');      
    }
  
    return (<>          
          <b>{groupName}</b>
          {(tmp.note !== '' ?          
          <>
          <GoASpacer vSpacing="xs" />
          {tmp.note}
          <GoASpacer vSpacing="xs" /></>
          : <></>)}
          
          <GoATable >              
          {/* <table className="security-table"> */}
            <tbody>
              {(tableTH.length > 0 
              ? <tr className='alignleft borderbottom'><th >{tableTH[0]} </th><th>{tableTH[1]} </th></tr>  
              : <tr className='alignleft borderbottom'><th></th><th></th></tr>
              )}
              { group.Items.map((item :any) => (            
                <tr key={item.Field+'0'}>
                <td key={item.Field+'1'}> {getDisplayName(fields, item.Field)}  </td> 
                <td key={item.Field+'2'} className={'service-content '+ tmp.css.replace('[value]', item.Value)}> {item.Value}  </td></tr>
              )) }
            </tbody>
            </GoATable>            
            {/* </table> */}
            <GoASpacer vSpacing="xl" />         
        </>      
    );  
  }

const renderContact = (method: any) => {
  const contactMethods: any = {
    Slack: {
      iconType: 'logo-slack',
      linkPrefix: '',
    },
    Email: {
      iconType: 'mail',
      linkPrefix: 'mailto:',
    },
    Phone: {
      iconType: 'call',
      linkPrefix: 'tel:',
    },
    BERNIE: {
      iconType: 'cart',
      linkPrefix: '',
    },
    Web: {
      iconType: 'globe',
      linkPrefix: '',
    },
    Sharepoint: {
      iconType: 'share-social',
      linkPrefix: '',
    },
    Github: {
      iconType: 'logo-github',
      linkPrefix: '',
    },
  };
    const methodConfig = contactMethods[method.type] || {};
    const iconType = methodConfig.iconType || '';
    const linkPrefix = methodConfig.linkPrefix || '';

    return (
      <tr key={method.type} className="items-color">
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

  const renderContent = (name: string, app: any, fields: FieldItem[], dataType: string, css: string, paragraph: boolean) => {

    if (dataType === 'urlArray') {   
      return app[name].map((doc: any) => (
        <div key={'links'+doc.name}>
          <ExternalLink text={`${doc.name}`} link={doc.url} />
          <GoASpacer vSpacing="s" />
        </div>
      ));
    }

    else if ( dataType === 'status' ) {
      return (
      <GoABadge key="Status" type={app[name] == 'Live'? 'success':'midtone'} content={app[name]} />
      )
    }

    else if (name === 'Specifications' || dataType === 'Specs()' ) {
      return (
        <GoATable>
        {/* <table > */}
        <tbody>        
          {app.InternalWeightage > 49 ? (<tr><td> <GoABadge key="Recommended" type="midtone"   content="Recommended"  /> </td><td></td></tr>) : ('')}
          {app.InternalWeightage < 0  ? (<tr><td> <GoABadge key="Removed"     type="emergency" content="To be removed"/> </td><td></td></tr>) : ('')}

          {items.fieldsSpec.map(({ property, title, id, dataType, css }: any) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{renderContent(property, app, fields, dataType, css, false)}</td>
            </tr>
          ))}
        </tbody>
        {/* </table> */}
        </GoATable>
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
        { app.Security.map((sGroup :any, index: any) => (
          <SecurityBlock key={index} group={sGroup} fieldList={fields} />
          )) }      
      </> );
    }

    else if (dataType === 'textArray')          
      if (paragraph)
        return <p className={"service-content " + css}>{app[name].join(", ")} </p>;
      else
        return <span className={"service-content "+ css}>{app[name].join(", ")} </span>;

    else if (paragraph)        
        return <p className={'service-content '+ css.replace('[value]', app[name])}>{app[name]} </p>;
    else
        return <span className={'service-content '+ css.replace('[value]', app[name])}>{app[name]} </span>;

  };


  interface FieldPlus extends FieldItem { id: string; }

  const filteredFields = (fields: FieldItem[], filterCondition: string): FieldPlus[] => {
    return fields.filter((item: FieldItem) =>
       item.group === filterCondition && (item.dataType.indexOf('(') > 0
        || app[item.property].length > 0 
        || (item.property === 'Contact' && app.Contact.methods.length > 0) ))
    .map((obj: FieldItem) => ({
         ...obj
         ,id: 'myservice-' + obj.property        
       }));
  };

  return (
    <>
      <GoAThreeColumnLayout
        nav= {
          <div className="details-side-nav">           
            <GoASideMenu>           
              { items.fieldsBody.map((content: any) => {
                  return ( <a key={`${content.id}`} href={`#${content.id}`}> {content.title} </a> );
                })
              }
            </GoASideMenu>            
          </div>
        }
       > 

        <GoASpacer vSpacing="xs" />        
        {items.fieldsTop.map(({ property, dataType, css, id }: any) => (
          <div key={`${id}`}>
             {renderContent(property, app, fields, dataType, css, false)}             
             <GoASpacer vSpacing="s" />
          </div>
          ))
        }

        <GoASpacer vSpacing="xl" />
        {items.fieldsBody.map(({ property, title, id, dataType,css }: any) => {            
            return (
              <div key={`${id}`}>
                <h3 id={`${id}`}>{title} </h3>
                {renderContent(property, app, fields, dataType, css, true)}
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