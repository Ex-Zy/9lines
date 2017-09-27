import { Storage } from '../services/storage';
export declare class Resolver {
    private storage;
    constructor(storage: Storage);
    /**
     * Returns all files that depends on the specified file.
     */
    getDependencies(filepath: string): string[];
    /**
     * Returns True if A depends on B.
     */
    checkDependency(filepath: string, filepathToCheck: string): boolean;
    private traverse(filepath, keys, result, maxIterations);
}
