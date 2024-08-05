'use strict';

// Without Trie
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

function isPrefix(words: string[], potentialPrefix: string): boolean {
    return (words || []).some((word: string) => {
        return potentialPrefix.includes(word);
    });
};
/*
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */
function noPrefix(words: string[]): void {
    // Write your code here
    const wordsWithPrefix: string[] = (words || []).reduce((acc, word, index, self) => {
        const wordsToTest = self.slice(0, index);
        if(isPrefix(wordsToTest, word)) {
            acc.push(word);
        }
        return acc;
    }, []);

    if(wordsWithPrefix[0]) {
        console.log("BAD SET");
        console.log(wordsWithPrefix[0]);
    } else {
        console.log("GOOD SET");
    }
}

function main() {
    const n: number = parseInt(readLine().trim(), 10);

    let words: string[] = [];

    for (let i: number = 0; i < n; i++) {
        const wordsItem: string = readLine();
        words.push(wordsItem);
    }

    noPrefix(words);
}

// With Trie