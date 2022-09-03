import { QuadraticVote, Strategy } from './types';
export declare function percentageOfTotal(i: any, values: any, total: any): number;
export declare function quadraticMath(i: any, choice: any, balance: any): number;
export default class QuadraticVoting {
    proposal: {
        choices: string[];
    };
    votes: QuadraticVote[];
    strategies: Strategy[];
    selected: {
        [key: string]: number;
    };
    constructor(proposal: {
        choices: string[];
    }, votes: QuadraticVote[], strategies: Strategy[], selected: {
        [key: string]: number;
    });
    static isValidChoice(voteChoice: {
        [key: string]: number;
    }, proposalChoices: string[]): boolean;
    getValidVotes(): QuadraticVote[];
    getScores(): number[];
    getScoresByStrategy(): number[][];
    getScoresTotal(): number;
    getChoiceString(): string;
}
