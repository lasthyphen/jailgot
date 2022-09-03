import Multicaller from './utils/multicaller';
import { getSnapshots } from './utils/blockfinder';
import getProvider from './utils/provider';
import { signMessage, getBlockNumber } from './utils/web3';
import { getHash, verify } from './sign/utils';
interface Options {
    url?: string;
}
interface Strategy {
    name: string;
    network?: string;
    params: any;
}
export declare const SNAPSHOT_SUBGRAPH_URL: {
    1: string;
    4: string;
    5: string;
    10: string;
    42: string;
    56: string;
    100: string;
    137: string;
    250: string;
};
export declare function call(provider: any, abi: any[], call: any[], options?: any): Promise<any>;
export declare function multicall(network: string, provider: any, abi: any[], calls: any[], options?: any): Promise<any>;
export declare function subgraphRequest(url: string, query: any, options?: any): Promise<any>;
export declare function getUrl(uri: any, gateway?: string): any;
export declare function getJSON(uri: any): Promise<any>;
export declare function ipfsGet(gateway: string, ipfsHash: string, protocolType?: string): Promise<any>;
export declare function sendTransaction(web3: any, contractAddress: string, abi: any[], action: string, params: any[], overrides?: {}): Promise<any>;
export declare function getScores(space: string, strategies: Strategy[], network: string, addresses: string[], snapshot?: number | string, scoreApiUrl?: string): Promise<any>;
export declare function getVp(address: string, network: string, strategies: Strategy[], snapshot: number | 'latest', space: string, delegation: boolean, options?: Options): Promise<any>;
export declare function validateSchema(schema: any, data: any): true | import("ajv").ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
export declare function getEnsTextRecord(ens: string, record: string, network?: string): Promise<any>;
export declare function getSpaceUri(id: any, network?: string): Promise<any>;
export declare function getDelegatesBySpace(network: string, space: string, snapshot?: string): Promise<never[]>;
export declare function clone(item: any): any;
export declare function sleep(time: any): Promise<unknown>;
export declare function getNumberWithOrdinal(n: any): string;
declare const _default: {
    call: typeof call;
    multicall: typeof multicall;
    subgraphRequest: typeof subgraphRequest;
    ipfsGet: typeof ipfsGet;
    getUrl: typeof getUrl;
    getJSON: typeof getJSON;
    sendTransaction: typeof sendTransaction;
    getScores: typeof getScores;
    getVp: typeof getVp;
    validateSchema: typeof validateSchema;
    getEnsTextRecord: typeof getEnsTextRecord;
    getSpaceUri: typeof getSpaceUri;
    getDelegatesBySpace: typeof getDelegatesBySpace;
    clone: typeof clone;
    sleep: typeof sleep;
    getNumberWithOrdinal: typeof getNumberWithOrdinal;
    voting: {
        'single-choice': typeof import("./voting/singleChoice").default;
        approval: typeof import("./voting/approval").default;
        quadratic: typeof import("./voting/quadratic").default;
        'ranked-choice': typeof import("./voting/rankedChoice").default;
        weighted: typeof import("./voting/weighted").default;
        basic: typeof import("./voting/singleChoice").default;
    };
    getProvider: typeof getProvider;
    signMessage: typeof signMessage;
    getBlockNumber: typeof getBlockNumber;
    Multicaller: typeof Multicaller;
    getSnapshots: typeof getSnapshots;
    validations: {
        basic: typeof import("./validations/basic").default;
        aave: typeof import("./validations/aave").default;
        nouns: typeof import("./validations/nouns").default;
        timeperiod: typeof import("./validations/timeperiod").default;
    };
    getHash: typeof getHash;
    verify: typeof verify;
    SNAPSHOT_SUBGRAPH_URL: {
        1: string;
        4: string;
        5: string;
        10: string;
        42: string;
        56: string;
        100: string;
        137: string;
        250: string;
    };
};
export default _default;
