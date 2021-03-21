import getFrequency from "./utility/getFrequency.js"
import frequencyData from "./utility/frequencyData.js"





var example = "gsv jfrxp yildm ulc qfnkh levi gsrigvvm ozab wlth"
var alphabet = "abcdefghijklmnopqrstuvwxyz"
var cipherText = "zyxwvutsrqponmlkjihgfedcba"

var dataOut = getFrequency(example.split(" ").join(""))
var d = []

for (const letter in dataOut) {
    if (Object.prototype.hasOwnProperty.call(dataOut, letter)) {
        const frequency = dataOut[letter];
        d.push({letter, frequency})
    }
}

d.sort((a, b) => {
    if (a.frequency > b.frequency) return -1
    if (a.frequency < b.frequency) return 1
    return 1
})

console.log(d.map(i=> i.letter).join(""))

var sortedFrequencyData = []
for (const letter in frequencyData) {
    if (Object.prototype.hasOwnProperty.call(frequencyData, letter)) {
        const data = frequencyData[letter];
        sortedFrequencyData.push({letter, frequency: data.frequency})
    }
}

d.sort((a, b) => {
    if (a.frequency > b.frequency) return -1
    if (a.frequency < b.frequency) return 1
    return 1
})


console.log(sortedFrequencyData.map(i=> i.letter.toLowerCase()).join(""))
var o = ""
for (let i = 0; i < alphabet.split("").length; i++) {
    const a = alphabet.split("")[i];

    var index = sortedFrequencyData.map(i=>i.letter.toLowerCase()).indexOf(a)
    o += d.map(i=>i.letter)[index]
}
console.log(o)