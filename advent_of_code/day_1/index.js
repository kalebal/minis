var readline = require('readline');

const chunks = []

let currentChunk = []

/*
In: .txt file containing numbers separated into chunks separated by an empty line
Out: the greatest total sum of all chunks
    pt 2: sum of the top 3 chunks
*/

readline.createInterface({
    input: fs.createReadStream('data.txt'),
    terminal: false
}).on('line', function(line) {
  if (line === '') {
    // end of one chunk: total it then reset for the next chunk
    let total = totalChunk(currentChunk)
    chunks.push(total)
    currentChunk = []

  } else {
    // the chunk continues
    currentChunk.push(line)
  }
}).on('close', () => {
  sortTotals(chunks)
  console.log('GREATEST TOTAL: ', chunks[0])
  console.log('TOTAL OF TOP 3: ', chunks[0] + chunks[1] + chunks[2])
});

// helper functions

function totalChunk(arr) {
  let sum = 0
  for (let num of arr) {
    sum += parseInt(num)
  }
  return sum
}

function sortTotals(arr) {
  return arr.sort((a, b) => b - a)
}

