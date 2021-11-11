import {useContext} from 'react';
import {WordPuzzleContext} from '../../context/WordPuzzleContext'
import './PuzzleCompletedPopup.scss'

const PuzzleCompletedPopup = () => {
    const {wordPuzzles, setSolvedWordPuzzles, setCurrWordPuzzleIndex, setCurrWordPuzzle, setAllPuzzlesCompleted} = useContext(WordPuzzleContext)
    
    const resetPuzzle = () => {
        setSolvedWordPuzzles([])
        setCurrWordPuzzleIndex(0)
        setCurrWordPuzzle(wordPuzzles[0])
        setAllPuzzlesCompleted(false)
    }

    return (
        <div className="puzzle-completed-popup">
            <div className="puzzle-completed-popup__copy">
                <h3 className="puzzle-completed-popup__copy__title">Congratulations you have completed all {wordPuzzles.length} puzzles 🥳</h3>
                <button className="button" onClick={() => resetPuzzle()}>Start over</button>
            </div>
        </div>
    )
}

export default PuzzleCompletedPopup