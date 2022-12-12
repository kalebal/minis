var readline = require('readline');
var fs = require('fs')

let matches = ''
let group = []
readline.createInterface({
    input: fs.createReadStream('data.txt'),
    terminal: false
}).on('line', function(line) {
    // let l = line.slice(0, line.length / 2)
    // let r = line.slice(line.length / 2)
    // matches += findMatches(l, r)
    group.push(line)
    if (group.length === 3) {
        matches += findBadgeInSet(group)
        group = []
    }

}).on('close', function() {
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
            lObj[l[i]] = false
            matches += l[i]
        }
    }
    return matches
}

function totalMatchPriorities(matches) {
    console.log('MATCHES', matches)
    let total = 0
    for (let i = 0; i < matches.length; i++) {
        // console.log('CHAR CODE AT: ', matches[i], matches.charCodeAt(i))
        let matchCharCode = matches.charCodeAt(i) // html code
        if (matchCharCode <= 90) { // is upper case
            total += matchCharCode - 38
        } else {
            total += matchCharCode - 96
        }
    }
    return total
}

function findBadgeInSet(arr) {
    //in: set of 3 strings (group's sacks)
    // out: char equalling that group's badge (common to all 3 strings)
    // maybe: one object, count to 3?
    let sets = [{}, {}, {}]
    for (let i = 0; i < arr.length; i++) {
        for (let char of arr[i]) {
            if (sets[i][char]) {
                sets[i][char]++
            } else {
                sets[i][char] = 1
            }
        }
    }
    let badge = ''
    let keys = Object.keys(sets[0])
    console.log(sets[0]['r'])
    console.log(sets[1]['r'])
    console.log(sets[2]['r'])
    for (let i = 0; i < keys.length; i++) {
        let letter = keys[i]
        if (sets[0][letter] && sets[1][letter] && sets[2][letter]) {
            console.log('ALL 3 ', letter)
            badge += letter
        }
    }
    console.log('BADGE: ', badge)
    return badge
}