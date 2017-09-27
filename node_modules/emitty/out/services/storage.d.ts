export interface IStorageItem {
    dependencies: string[];
    ctime: number;
}
export interface IStorage {
    [uri: string]: IStorageItem;
}
export declare class Storage {
    private store;
    private interval;
    constructor();
    load(snapshot: IStorage): void;
    has(uri: string): boolean;
    get(uri: string): IStorageItem;
    set(uri: string, item: IStorageItem): void;
    drop(uri: string): void;
    keys(): string[];
    snapshot(): IStorage;
    startInvalidation(timeInterval: number): void;
    stopInvalidation(): void;
}
