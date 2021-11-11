import { WordPuzzle } from "../context/types"

const extractPuzzleAnswers = (currWordPuzzle: WordPuzzle) => {
    let translatedWordLocations = []
    for (const word in currWordPuzzle.word_locations) {
        translatedWordLocations.push(word.replace(/[ ,.]/g, "").match(/(..?)/g))
    }
    return translatedWordLocations as RegExpMatchArray[]
}

export default extractPuzzleAnswers