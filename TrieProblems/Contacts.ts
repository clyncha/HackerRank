'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

class TrieNode {
  children: any;
  isEnd: boolean;
  value?: string;
  constructor(value?: string) {
    this.value = value;
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
      let node: TrieNode = this.root;
      for (let i = 0; i < word.length; i++) {
        const char: string = word[i];
        if (!node.children[char]) {
          node.children[char] = new TrieNode(char);
        }
        node = node.children[char];
      }
      node.isEnd = true;
    }

  findCount(prefix: string) {
    // Helper function to count all words starting from a given node
    const countWords = (node: TrieNode): number => {
    let count = node.isEnd ? 1 : 0;
      for (let char in node.children) {
        count += countWords(node.children[char]);
      }
      return count;
    }

    // Now to find the count
    let node = this.root;

    // Traverse the Trie to the end of the prefix
    for (let i = 0; i < prefix.length; i++) {
      const char: string = prefix[i];
      if (node.children[char]) {
        node = node.children[char];
      } else {
        // Prefix not found
        return 0;
      }
    }

    // Count all words starting from the node corresponding to the last character of the prefix
    return countWords(node);
  }
}

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

/*
 * Complete the 'contacts' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_STRING_ARRAY queries as parameter.
 */

const enum COMMAND {
    ADD = 'add',
    FIND = 'find',
}

function contacts(queries: string[][]): number[] {
    const names: Trie = new Trie();
    const result: number[] = [];
    return queries.reduce((acc, query) => {
      const input = query[1];
      if(COMMAND.ADD === query[0]) {
        names.insert(input);
      } else {
        acc.push(names.findCount(input));
      }
      return acc;
    }, result);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const queriesRows: number = parseInt(readLine().trim(), 10);

    let queries: string[][] = Array(queriesRows);

    for (let i: number = 0; i < queriesRows; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    const result: number[] = contacts(queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}