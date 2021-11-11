import {useContext} from 'react';
import {WordPuzzleContext} from '../../context/WordPuzzleContext'
import './PuzzleInfo.scss'

const PuzzleInfo = () => {
    const {wordPuzzles, currWordPuzzle, solvedWordPuzzles} = useContext(WordPuzzleContext)
    
    const remainingPuzzles = wordPuzzles.map((puzzle, index) => !solvedWordPuzzles.includes(puzzle.word) && currWordPuzzle.word !== puzzle.word ? <h4 key={puzzle.word+index} className="puzzle-info__item">{puzzle.word}</h4> : null)

    return (
        <div className="puzzle-info">
            <h4 className="puzzle-info__label">Solved puzzles</h4>      
            <div className="puzzle-info__row">
                <h4 className="puzzle-info__item puzzle-info__item--highlight">{solvedWordPuzzles.length +  ' / ' + wordPuzzles.length}</h4>
            </div>
            <h4 className="puzzle-info__label">Remaining puzzles</h4>      
            <div className="puzzle-info__row">
                {remainingPuzzles}
            </div>
        </div>
    )
}
export default PuzzleInfo