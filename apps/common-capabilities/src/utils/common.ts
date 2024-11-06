export function getServicePathName(serviceName: string): string {
    return serviceName.toLocaleLowerCase().replace(/ |\//g, '-');
}