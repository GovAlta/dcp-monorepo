import { ServiceListingResponse } from "../types/types";
import axios from "axios";

export type AxioServiceResponse = {
    data?: ServiceListingResponse
}

export async function getAstroStaticPaths(paramKey: string) {
    const paths: any = [];

    try {
      const result: AxioServiceResponse = await axios.get('http://localhost:3333/cc/v1/listings/services');
  
      if (result?.data?.services) {
        result?.data?.services?.forEach((service) => {
          paths.push({
            params: {
                [paramKey]: getServicePathName(service.ServiceName),
            },
            props: {
                app: service,
            },
          });
        });
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  
    return paths;
}

export function getServicePathName(serviceName: string): string {
    return serviceName.toLocaleLowerCase().replace(/ |\//g, '-');
}