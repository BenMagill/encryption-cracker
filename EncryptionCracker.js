import findWords from "./getWords.js";
import frequencyTable from "./frequencyData.js";
console.log("hi");
const frequency = (str) => {
    const dict = {};
    str.split("").forEach((letter) => {
        letter = letter.toLowerCase();
        if (letter === " ")
            letter = "SPACE";
        var count = dict[letter];
        if (count) {
            dict[letter] = count + 1;
        }
        else {
            dict[letter] = 1;
        }
    });
    for (const key in dict) {
        if (Object.hasOwnProperty.call(dict, key)) {
            const value = dict[key];
            dict[key] = value / str.split("").length;
        }
    }
    return dict;
};
const decrypt = (data, key, alphabet) => {
    var array = data.split("");
    var encodedArray = array.map(letter => {
        var isUpperCase = letter !== letter.toLowerCase();
        var index = alphabet.indexOf(letter.toLowerCase());
        var result = "";
        // If -1 then not found in alphabet so keep the same
        if (index !== -1) {
            var newIndex = index + key;
            if (newIndex >= alphabet.length || newIndex < 0) {
                // Wraps the array back round (for example if you get 1 more then highest index will get 1st item)
                result = alphabet[(newIndex % alphabet.length + alphabet.length) % alphabet.length];
            }
            else {
                result = alphabet[newIndex];
            }
        }
        else {
            result = letter;
        }
        if (isUpperCase)
            return result.toUpperCase();
        return result;
    });
    return encodedArray.join("");
};
// Brute forcing::
/**
 * For every possible outcome
 *      Use a wordlist to see if the output contains any english words.
 *          Make it so the longer the word the more the weight added is?
 *              For example "and" is common and could possibly be found in other outputs while "because" has little change of being in an incorrect output
 *
 *      Compare letter frequencies against a standard frequency table for the alphabet
 *
 *      Option for converting numbers into letter versions
 *          Eg "3l1t3" becomes "elite"
 *
 *  Want it to work with ceasar ciphers mainly but possibly with other ones
 */
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var defaultOptions = {
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    frequency: {
        includeSpaces: false
    },
    onResult: () => { },
    ignoreCase: false
};
for (const letter in frequencyTable) {
    if (Object.prototype.hasOwnProperty.call(frequencyTable, letter)) {
        const letterData = frequencyTable[letter];
        console.log(`${letter}: ${letterData.frequency}`);
    }
}
const bruteForce = (encrypted, userOptions) => {
    // Get options
    const options = { ...defaultOptions, ...userOptions };
    console.log(`Trying ${options.alphabet?.length} combinations`);
    // Lowercases the input if wanted
    if (options.ignoreCase)
        encrypted = encrypted.toLowerCase();
    var possibilities = [];
    // Get each possible result
    for (let i = 1; i < options.alphabet.length; i++) {
        // Get the result of decrpyting
        var result = decrypt(encrypted, i, alphabet);
        // Send the result to a function if wanted
        if (options.onResult)
            options.onResult({ value: result, progress: i, total: options.alphabet.length - 1 });
        // Get letter frequencies
        var frequencies = frequency(options.frequency?.includeSpaces ? result : result.replace(/[^a-zA-Z]+/gi, ""));
        for (const letter in frequencies) {
            if (Object.prototype.hasOwnProperty.call(frequencies, letter)) {
                const letterData = frequencies[letter];
                // console.log(`${letter}: ${letterData}`)
            }
        }
        // Add the word list
        possibilities.push({ result, words: findWords(result), shift: i, frequencies });
    }
    // Rank by word count (high to low)
    possibilities.sort((a, b) => {
        return a.words - b.words;
    }).reverse();
    // console.log(possibilities)
    // Get highest ranking by words
    var bestGuess = possibilities[0];
    console.log(`Most likey result is "${bestGuess.result}" (${bestGuess.words} words, shift of ${bestGuess.shift})`);
    for (const letter in bestGuess.frequencies) {
        if (Object.prototype.hasOwnProperty.call(bestGuess.frequencies, letter)) {
            const letterData = bestGuess.frequencies[letter];
            const expected = frequencyTable[letter.toUpperCase()].frequency;
            console.log(`${letter}: ${letterData - expected}`);
        }
    }
};
// console.log(frequency("fjewoivnmeoijfowjf 32if e iwewepof i"))
bruteForce("uryyb gurerf zl anzr vf ora", { frequency: { includeSpaces: false } });
// TODO: use letter frequencies in determining best result
// TODO: handle no words being found better
// TODO: add replace numbers with letter alternative
