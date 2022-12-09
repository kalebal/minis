var readline = require('readline');

let matches = ''

readline.createInterface({
    input: fs.createReadStream('data.txt'),
    terminal: false
}).on('line', function(line) {
    let l = line.slice(0, line.length / 2)
    let r = line.slice(line.length / 2)
    matches += findMatches(l, r)
    console.log('TOTAL', totalMatchPriorities(matches))
})

// l + r are equal length strings that possibly contain the same letter
// this returns a string containing any matches
function findMatches(l, r) {
    let lObj = {}
    let rObj = {}
    for (let i = 0; i < l.length; i++) {
        if (!lObj[l[i]]) {
            lObj[l[i]] = 1
        } else {
            lObj[l[i]]++
        }
        if (!rObj[r[i]]) {
            rObj[r[i]] = 1
        } else {
            rObj[r[i]]++
        }
    }

    let matches = ''
    for (let i = 0; i < l.length; i++) {
        if (lObj[l[i]] && rObj[l[i]]) {
            matches += l[i]
        }
    }
    return matches
}

function totalMatchPriorities(matches) {
    let total = 0
    for (let i = 0; i < matches.length; i++) {
        total += matches.charCodeAt(i) - 97
    }
    return total
}