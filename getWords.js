import checkWord from 'check-word';
var words = checkWord("en");
export default (str) => {
    // Split by spaces and for each word check if in the dictionary
    var wordCount = 0;
    var wordList = str.split(" ");
    var maxWords = str.length;
    for (let word of wordList) {
        // Sanitise word so only letters
        word = word.replace(/[^a-zA-Z]+/gi, "");
        // TODO: Use a better word checker
        if (words.check(word.toLowerCase())) {
            wordCount++;
        }
    }
    return wordCount;
};
