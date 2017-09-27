/// <reference types="node" />
import * as fs from 'fs';
export declare function pathExists(filepath: string): Promise<boolean>;
export declare function pathExistsSync(filepath: string): boolean;
export declare function readFile(filepath: string): Promise<string>;
export declare function statFile(filepath: string): Promise<fs.Stats>;
