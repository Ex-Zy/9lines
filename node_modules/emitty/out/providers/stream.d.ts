/// <reference types="node" />
import * as fs from 'fs';
import * as stream from 'stream';
import { IOptions } from '../emitty';
import { Storage } from '../services/storage';
import { ILanguage } from '../services/config';
export declare class Stream {
    private root;
    private storage;
    private language;
    private options;
    private scanner;
    private resolver;
    constructor(root: string, storage: Storage, language: ILanguage, options: IOptions);
    /**
     * Starts scanning the directory and push Vinyl file to a Stream if it is required.
     */
    run(filepath?: string, stats?: fs.Stats): stream.Transform;
    /**
     * Push Vinyl file to a Stream if it is required.
     */
    filter(filepath: string): stream.Transform;
    /**
     * Determines whether to send the Vinyl file to a Stream.
     */
    private filterFileByDependencies(filepath, mainFile, streamCtx, file, cb);
    /**
     * Push Vinyl file to a Stream.
     */
    private pushFile(ctx, file, filepath);
    /**
     * Calculates relative path of the Vinyl file in Stream.
     */
    private makeMainFilePath(root, file);
    /**
     * Creates Vinyl File for filepath.
     */
    private makeVinylFile(filepath);
}
