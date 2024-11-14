export interface DataCache {
    has(key: string): Promise<boolean>;
    get(key: string): Promise<object | undefined>;
    set(key: string, value: object): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
}

export type FormSchema = {
    dataSchema: object,
    uiSchema: object
}

export type CachedShema = {
    [definitionId: string]: FormSchema | undefined
}