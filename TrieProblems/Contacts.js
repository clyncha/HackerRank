'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var inputLines = [];
var currentLine = 0;
process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});
process.stdin.on('end', function () {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});
function readLine() {
    return inputLines[currentLine++];
}
function contacts(queries) {
    var names = [];
    var result = [];
    queries.map(function (query) {
        // Determine command from first index
        var command = query[0];
        var nameInput = query[1];
        if ("add" /* COMMAND.ADD */ === command) {
            // Add name
            names.push(nameInput);
        }
        else {
            // Perform function to find matches
            var matches = names.filter(function (name) {
                return name.indexOf(nameInput) === 0;
            });
            // Determine value to either add or search with from second index
            result.push(matches.length);
        }
    });
    return result;
}
function main() {
    var ws = (0, fs_1.createWriteStream)(process.env['OUTPUT_PATH']);
    var queriesRows = parseInt(readLine().trim(), 10);
    var queries = Array(queriesRows);
    for (var i = 0; i < queriesRows; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ');
    }
    var result = contacts(queries);
    ws.write(result.join('\n') + '\n');
    ws.end();
}
