export default (str: string ) => {

    const dict: {[key: string]: number} = {}
    str.split("").forEach((letter: string) => {
        letter = letter.toLowerCase()
        if (letter === " ") letter = "SPACE"
        var count = dict[letter]
        if (count) {
            dict[letter] = count+1
        } else {
            dict[letter] = 1
        }
    });
    for (const key in dict) {
        if (Object.hasOwnProperty.call(dict, key)) {
            const value = dict[key];
            dict[key] = value/str.split("").length
        }
    }
    return dict
}