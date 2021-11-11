import {useContext} from 'react'
import {WordPuzzleContext} from '../../context/WordPuzzleContext'
import './PuzzleSolvedPopup.scss'

const PuzzleSolvedPopup = () => {
    const {wordPuzzles, solvedWordPuzzles} = useContext(WordPuzzleContext)
    const puzzlesRemaining = solvedWordPuzzles && solvedWordPuzzles.length < wordPuzzles.length
    return (
        <div className="puzzle-solved-popup">
            <h4>🥳&nbsp;&nbsp;Congratulations puzzle solved. { puzzlesRemaining && <span className="puzzle-solved-popup__highlight">Onto the next </span>}&nbsp;💪</h4>
        </div>
    )
}
export default PuzzleSolvedPopup