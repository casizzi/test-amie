import {useContext, useState, useEffect} from 'react';
import {WordPuzzleContext} from '../../context/WordPuzzleContext'
import {CSSTransition} from 'react-transition-group'
import isEqual from 'lodash.isequal'

import {PUZZLE_SOLVED_DELAY} from '../../constants'
import validateCharGrid from '../../helpers/validateCharGrid'
import extractPuzzleAnswers from '../../helpers/extractPuzzleAnswers'

import WordLetter from '../WordLetter/WordLetter'
import PuzzleSolvedPopup from '../PuzzleSolvedPopup/PuzzleSolvedPopup'
import './WordGrid.scss'

const WordGrid = () => {
    const {
        wordPuzzles, 
        currWordPuzzle, 
        setCurrWordPuzzle, 
        currWordPuzzleIndex, 
        setCurrWordPuzzleIndex,
        currSolvedWords,
        setCurrSolvedWords,
        solvedWordPuzzles, 
        setSolvedWordPuzzles,
        setAllPuzzlesCompleted
    } = useContext(WordPuzzleContext)
    const [validatedCharGrid, setValidatedCharGrid] = useState<string[][]>([])
    const [currDirection, setCurrDirection] = useState<string | boolean>(false)
    const [isSelectingWord, setIsSelectingWord] = useState(false)
    const [selectedWordLocation, setSelectedWordLocation] = useState<string[]>([])
    const [answerLocations, setAnswerLocations] = useState<RegExpMatchArray[]>([])
    const [solvedLetters, setSolvedLetters] = useState<string[]>([])
    const [isPuzzleSolved, setIsPuzzleSolved] = useState(false)

    useEffect(() => { 
        setAnswerLocations(extractPuzzleAnswers(currWordPuzzle)) 
        setValidatedCharGrid(validateCharGrid(currWordPuzzle))
    }, [currWordPuzzle])
    useEffect(() => checkSelectedLetters(), [selectedWordLocation])
    useEffect(() => checkIfPuzzleSolved(), [currSolvedWords])

    const checkSelectedLetters = () => {
        //loop through the translation answers and check if the selected letters match any and if they do save them
        answerLocations.forEach(answer => {
            const selectedWordMatchesAnswer = isEqual(answer, selectedWordLocation)
            if(selectedWordMatchesAnswer) {
            //save solved letters so that we can permanently highlight them
                const solvedLettersCopy = [...solvedLetters.concat(selectedWordLocation)]
                setSolvedLetters(solvedLettersCopy)
            //save solved words so that we can keep track if the puzzle has been solved
                //1. stringify the selected word xy values
                let solvedWordString = ''
                selectedWordLocation.forEach( xy => solvedWordString = solvedWordString + xy.replace(/.{1}/g, '$&,'))
                //2. update solved words with original data structure of xy corrdinates as the key and name as the value
                const solvedWordsCopy = {...currSolvedWords, [solvedWordString.replace(/,\s*$/, "")]: currWordPuzzle.word_locations[solvedWordString.replace(/,\s*$/, "")]}
                setCurrSolvedWords(solvedWordsCopy)
            }
        })
    }

    const checkIfPuzzleSolved = () => {
        if(isEqual(currSolvedWords, currWordPuzzle.word_locations)) {
            const solvedPuzzles = [...solvedWordPuzzles, currWordPuzzle.word]
            setSolvedWordPuzzles(solvedPuzzles)
            setIsPuzzleSolved(true)
            setTimeout(() => {
                resetState()
                solvedPuzzles.length < wordPuzzles.length ? setNewWordPuzzle() : setAllPuzzlesCompleted(true)
            }, PUZZLE_SOLVED_DELAY)
        }
    }

    const resetState = () => {
        setIsSelectingWord(false)
        setCurrDirection(false)
        setSelectedWordLocation([])
        setSolvedLetters([])
        setCurrSolvedWords([])
        setIsPuzzleSolved(false)
    }
    
    const setNewWordPuzzle = () => {
        setCurrWordPuzzle(wordPuzzles[currWordPuzzleIndex + 1])
        setCurrWordPuzzleIndex(currWordPuzzleIndex + 1)
    }
    

    const renderWordGrid = validatedCharGrid.map((row: string[], yindex: number) => {
        return (
            <div key={currWordPuzzle.word+yindex} className="word-grid__row">
                {row.map((letter: string, xindex: number) => {
                    return (
                        <WordLetter 
                            key={currWordPuzzle.word+letter+xindex} 
                            letter={letter}
                            xindex={xindex}
                            yindex={yindex}
                            currDirection={currDirection}
                            setCurrDirection={setCurrDirection}
                            isSelectingWord={isSelectingWord} 
                            setIsSelectingWord={setIsSelectingWord}
                            selectedWordLocation={selectedWordLocation}
                            setSelectedWordLocation={setSelectedWordLocation}
                            isLetterFound={solvedLetters.includes(`${xindex}${yindex}`)}
                        />
                    )}
                )}
            </div>
        )
    })
    
    return (
        <div className={isPuzzleSolved ? 'word-grid word-grid--freeze' : 'word-grid'}>
            {renderWordGrid}
            <CSSTransition in={isPuzzleSolved} classNames="appear" unmountOnExit timeout={200}>
                <span className="word-grid__overlay" />
            </CSSTransition>
            <CSSTransition in={isPuzzleSolved} classNames="appear-up" unmountOnExit timeout={200}>
                <PuzzleSolvedPopup />
            </CSSTransition>
        </div>
    )
}
export default WordGrid