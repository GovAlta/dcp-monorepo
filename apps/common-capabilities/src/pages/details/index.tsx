import {
  GoAThreeColumnLayout,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
  GoATable
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
    fieldsBody: [],
    badges: []
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
      fieldsSpec: filteredFields(fields, 'Spec'),
      badges: getBadges(fields)
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

  interface FieldItem {
    property: string; 
    title: string; 
    note: string;
    group: string;
    Show: boolean;
    dataType: string;
    filter:string;
    css:string;
    showBadge:boolean
  }

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

    else if (dataType === 'Specs()' ) {
      return (
        <GoATable>
        {/* <table > */}
        <tbody>        
          {/* {app.InternalWeightage > 49 ? (<tr><td> <GoABadge key="Recommended" type="midtone"   content="Recommended"  /> </td><td></td></tr>) : ('')}
          {app.InternalWeightage < 0  ? (<tr><td> <GoABadge key="Removed"     type="emergency" content="To be removed"/> </td><td></td></tr>) : ('')} */}

          {items.fieldsSpec.map(({ property, title, id, dataType, css }: any) => (
          <tr key={id}>
            {property === 'InternalWeightage' ?
             (<> <td>{renderContent(property, app, fields, dataType, css, false)}</td><td></td></>) :
             (<><td>{title}</td> <td>{renderContent(property, app, fields, dataType, css, false)}</td></>)             
            }                        
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
        return <p className={"service-content " + css}>{app[name].join(", ")}</p>;
      else
        return <span className={"service-content "+ css}>{app[name].join(", ")}</span>;

    else if (dataType === 'Recommended()') {
      if (app.InternalWeightage > 49)
        return ( <GoABadge key="Recommended" type="midtone"   content="Recommended"  /> )
      else if (app.InternalWeightage < 0)
        return ( <GoABadge key="Removed"     type="emergency" content="To be removed"/> )
      else 
        return null
      }
       
    else if (dataType === 'Badges()') {
      return (
        <div className='service-badges'>
        {items.badges.map(({ property, dataType, id }: any) => (
          (dataType === 'textArray') ? 
          app[property].map((item: any, i:any) => renderBadge( property, 'text', item,i)):
          renderBadge( property, dataType, app[property],1)    
        ))} </div>
       ) 
      }

    else if (dataType === 'Text()') {
      return DynamicTag(css, getDisplayName(fields,name))
    }        

    else
      return DynamicTag(css, app[name])
  };

  function DynamicTag(style:string, content: string ) {
  // This function is to allow tags to be entered into the css property. A workaround to not use size in the css.
  // If font sizes are later allowed to be used in the css. All this could be removed and replaced by a css entry.
    const tagArray = splitCss(style)
    if (tagArray[0] === "<span")    return (<span className={'service-content '+ tagArray[1]}>{content}</span>);
    else if (tagArray[0] === "<h1") return (<h1   className={'service-content '+ tagArray[1]}>{content}</h1>);
    else if (tagArray[0] === "<h2") return (<h2   className={'service-content '+ tagArray[1]}>{content}</h2>);
    else if (tagArray[0] === "<h3") return (<h3   className={'service-content '+ tagArray[1]}>{content}</h3>);
    else if (tagArray[0] === "<h4") return (<h4   className={'service-content '+ tagArray[1]}>{content}</h4>);
    else if (tagArray[0] === "<b")  return (<p><b className={'service-content '+ tagArray[1]}>{content}</b></p>);    
    else                            return (<p    className={'service-content '+ tagArray[1]}>{content}</p>);    
  }

  function splitCss(style:string) {
    const tagArray = style.split('>')
    if (tagArray.length > 1)
      return [tagArray[0].toLowerCase(),tagArray[1]]
    else
      return ['',tagArray[0]]
  }

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

  const getBadges = (fields: FieldItem[]): FieldPlus[] => {
    return fields.filter((item: FieldItem) =>
       item.showBadge 
       && (item.dataType === 'text' || item.dataType === 'textArray' || item.dataType === 'Recommended()' )
       && app[item.property] != 'Other' && app[item.property] != 'n/a'
       && app[item.property].length > 0
       )
    .map((obj: FieldItem) => ({
         ...obj
         ,id: 'myservice-' + obj.property        
       }));
  };

  const renderBadge = (badge: any, dataType:string , val:any, index:number) => {
    if (dataType == 'text')
      return (
        <GoABadge key={'b-'+badge+index.toString()} type="information" content={val} />
      )
    else  if (dataType == 'Recommended()') {      
      if (app.InternalWeightage > 49)
        return ( <GoABadge key="Recommended" type="midtone"   content="Recommended"  /> )
      else if (app.InternalWeightage < 0)
        return ( <GoABadge key="Removed"     type="emergency" content="To be removed"/> )
      }
    else
      return (
        <span key={badge+index.toString()+'s'} > <GoABadge key={'b-'+badge+index.toString()} type="emergency"   content={badge} /> </span>      
      )    
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
          <>
            {renderContent(property, app, fields, dataType, css, false)}
            { css.substring(0,2) == '<h' ? 
            <></> :
            <GoASpacer vSpacing="l" /> }
          </>
          ))
        }
        
        {items.fieldsBody.map(({ property, title, id, dataType,css }: any) => {            
            return (
              <>
                <h3 id={`${id}`}>{title} {css}  </h3>
                {renderContent(property, app, fields, dataType, css, true)}                
                <GoASpacer vSpacing="xl" /> 
              </>              
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