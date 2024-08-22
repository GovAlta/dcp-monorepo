import { Tree, formatFiles, generateFiles } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import * as path from 'path';


export default async function (host: Tree, schema: any) {
  if(!schema?.title){
    throw new Error("Missing title")
  }
  generateFiles(
    // virtual file system
    host,

    // the location where the template files are
    path.join(__dirname, 'openshift'),

    // where the files should be generated
    '.openshift',

    // the variables to be substituted in the template
    {
      appName: schema.title,
    }
  );
  await formatFiles(host);
  return () => {
  };
}
