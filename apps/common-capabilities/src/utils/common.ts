import { ServiceListingResponse } from "../types/types";
import axios from "axios";
import { getApiUrl } from "./configs";

export type AxioServiceResponse = {
    data?: ServiceListingResponse
}

export async function getAstroStaticPaths(paramKey: string) {
    const paths: any = [];

    try {
      const servicesUrl = getApiUrl('listings/services');
      const result: AxioServiceResponse = await axios.get(servicesUrl);
  
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
    }
  
    return paths;
}

export function getServicePathName(serviceName: string): string {
    return serviceName.toLocaleLowerCase().replace(/ |\//g, '-');
}