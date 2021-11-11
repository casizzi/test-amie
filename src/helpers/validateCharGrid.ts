import words from './../assets/data/words.json'
import alphabet from './../assets/data/alphabet.json'
import {WordPuzzle} from './../context/types'


const minGridSize = () => {
    let minGridSize = 0
    words.forEach((puzzle => puzzle.character_grid.length > minGridSize ? minGridSize = puzzle.character_grid.length : null))
    return minGridSize
}

const randomChar = () => alphabet[Math.floor(Math.random()*alphabet.length)]
const validateLength = (element: number) => Math.sign(element) === 1

const validateCharGrid = (puzzle: WordPuzzle) => {
    let charGrid = [...puzzle.character_grid]

    // check if rows equal minGridSize, and if not random populate
    const rowCount = minGridSize() - charGrid.length
    if(validateLength(rowCount)) {
        for(let i = 0; i < rowCount; i++) {
            charGrid.push([randomChar()])
        }
    } 

    // check if row chars equal minGridSize, and if not random populate
    charGrid.forEach((row, rowIndex) => {
        const charCount = minGridSize() - row.length
        if(validateLength(charCount)) {
            for(let i = 0; i < charCount; i++) {
                charGrid[rowIndex].push(randomChar())
            }
        }
    })

    return charGrid
}

export default validateCharGrid