import { Logger } from "winston";
import { getServices, getService } from "./index";
import { DataCache } from "../../../cache/types";
import { CacheConfigs, CacheKeys } from "../../../cache";
import { TokenProvider } from "@abgov/adsp-service-sdk";
import axios from "axios";

jest.mock('axios');

describe('services', () => {
    let loggerMock, cacheMock, reqMock, resMock, tokenProviderMock;
    const services = [
        {
            appId: "1",
            ServiceName: "service1",
            description: "description1"
        },
        {
            appId: "2",
            ServiceName: "service2",
            description: "description2"
        }
    ];
    const valueServiceUrl = 'http://value.service' as unknown as URL;

    beforeEach(() => {
        jest.resetAllMocks();

        reqMock = {
            user: {
                token: {
                    bearer: 'token'
                }
            }
        } as unknown as jest.Mocked<Request>;
        resMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        } as unknown as jest.Mocked<Response>;
        tokenProviderMock = {
            getAccessToken: jest.fn().mockResolvedValue('token'),
        } as unknown as jest.Mocked<TokenProvider>;
        loggerMock = {
            info: jest.fn(),
            error: jest.fn()
        } as unknown as jest.Mocked<Logger>;
        cacheMock = {
            get: jest.fn().mockResolvedValue(services.reduce((acc, s) => ({...acc, [s.appId]: s}), {})),
            set: jest.fn().mockResolvedValue(undefined)
        } as unknown as jest.Mocked<DataCache>;
    });


    describe('getServices', () => {
        it('should return 200 and list of services from cache', async () => {
            await getServices(loggerMock, valueServiceUrl, cacheMock)(reqMock, resMock, jest.fn());

            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.send).toHaveBeenCalledWith({services: services});
        });

        it('should return list of services from value service if cache is empty', async () => {
            cacheMock.get = jest.fn().mockResolvedValue(null);
            jest.mocked(axios.get).mockResolvedValueOnce({data: {
                'common-capabilities': {
                    'published-index': [
                        {
                            value: {
                                index: services.map((s) => s.appId)
                            }
                        }
                    ]
                }
            }}).mockResolvedValueOnce({data: {
                'common-capabilities': {
                    [services[0].appId]: [
                        {
                            value: services[0]
                        }
                    ]
                }
            }}).mockResolvedValueOnce({data: {
                'common-capabilities': {
                    [services[1].appId]: [
                        {
                            value: services[1]
                        }
                    ]
                }
            }});

            await getServices(loggerMock, valueServiceUrl, cacheMock)(reqMock, resMock, jest.fn());

            expect(axios.get).toHaveBeenCalledTimes(3);
            expect(axios.get).toHaveBeenNthCalledWith(1, 'http://value.service/common-capabilities/values/published-index?top=1', {headers: {Authorization: `Bearer token`}});
            expect(axios.get).toHaveBeenNthCalledWith(2, 'http://value.service/common-capabilities/values/1?top=1', {headers: {Authorization: `Bearer token`}});
            expect(axios.get).toHaveBeenNthCalledWith(3, 'http://value.service/common-capabilities/values/2?top=1', {headers: {Authorization: `Bearer token`}});
            expect(cacheMock.set).toHaveBeenCalledWith(CacheKeys.SERVICES, {[services[0].appId]: services[0], [services[1].appId]: services[1]}, CacheConfigs[CacheKeys.SERVICES].ttl);
            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.send).toHaveBeenCalledWith({services: services});
        });

        it('should return 404 and empty list of services', async () => {
            cacheMock.get = jest.fn().mockResolvedValue(null);

            await getServices(loggerMock, valueServiceUrl, cacheMock)(reqMock, resMock, jest.fn());

            expect(resMock.status).toHaveBeenCalledWith(404);
            expect(resMock.send).toHaveBeenCalledWith({error: 'no services found'});
        });

        it('should return expected service list if value service data is invalid', async () => {
            cacheMock.get = jest.fn().mockResolvedValue(null);
            jest.mocked(axios.get).mockResolvedValueOnce({data: {
                'common-capabilities': {
                    'published-index': [
                        {
                            value: {
                                index: services.map((s) => s.appId)
                            }
                        }
                    ]
                }
            }}).mockResolvedValueOnce({data: {
                'common-capabilities': {
                    [services[0].appId]: [
                        {
                            value: services[0]
                        }
                    ]
                }
            }}).mockResolvedValueOnce({data: {
                'common-capabilities': {
                    [services[1].appId]: []
                }
            }});

            await getServices(loggerMock, valueServiceUrl, cacheMock)(reqMock, resMock, jest.fn());

            expect(axios.get).toHaveBeenCalledTimes(3);
            expect(cacheMock.set).toHaveBeenCalledWith(CacheKeys.SERVICES, {[services[0].appId]: services[0]}, CacheConfigs[CacheKeys.SERVICES].ttl);
            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.send).toHaveBeenCalledWith({services: [services[0]]});
        });
    });

    describe('getService', () => {
        it('should return 200 and service info', async () => {
            reqMock.params = {serviceId: services[0].appId};

            await getService(loggerMock, valueServiceUrl, cacheMock)(reqMock, resMock, jest.fn());            

            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.send).toHaveBeenCalledWith({serviceInfo: services[0]});
        });

        it('should return 404 if service not found', async () => {
            reqMock.params = {serviceId: 'does-not-exist'};

            await getService(loggerMock, valueServiceUrl, cacheMock)(reqMock, resMock, jest.fn());

            expect(resMock.status).toHaveBeenCalledWith(404);
            expect(resMock.send).toHaveBeenCalledWith({error: 'service not found with id=does-not-exist'});
        });
    });
});