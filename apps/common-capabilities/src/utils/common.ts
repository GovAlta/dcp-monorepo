import { ServiceListingResponse } from "../types/types";
import axios from "axios";
import { getApiUrl } from "./configs";

export type AxioServiceResponse = {
    data?: ServiceListingResponse
}

export function getServicePathName(serviceName: string): string {
    return serviceName.toLocaleLowerCase().replace(/ |\//g, '-');
}