import {useEffect, useState, Dispatch, SetStateAction} from 'react'
import './WordLetter.scss'
import validateDirection from './../../helpers/validateDirection'
interface WordLetterType {
    letter: string
    xindex: number
    yindex: number
    currDirection: string | boolean
    setCurrDirection: Dispatch<SetStateAction<string | boolean>>
    isSelectingWord: boolean 
    setIsSelectingWord: Dispatch<SetStateAction<boolean>>
    selectedWordLocation: string[] 
    setSelectedWordLocation: Dispatch<SetStateAction<string[]>>
    isLetterFound: boolean
}

const WordLetter = ({
    letter, 
    xindex, 
    yindex, 
    currDirection, 
    setCurrDirection, 
    isSelectingWord, 
    setIsSelectingWord, 
    selectedWordLocation, 
    setSelectedWordLocation, 
    isLetterFound,
}: WordLetterType) => {
    const [isThisLetterSelected, setIsThisLetterSelected] = useState(false)
    useEffect(() => {if(!isSelectingWord) setIsThisLetterSelected(false)}, [isSelectingWord])

    const startSelect = () => {
        setIsSelectingWord(true)
        setSelectedWordLocation([`${xindex}${yindex}`])
        setIsThisLetterSelected(true)
    }

    const dragSelect = () => { 
        if(isSelectingWord) {
            const validDirection = validateDirection({currDirection, selectedWordLocation, xindex, yindex})
            console.log('validDirection', validDirection)
            if(validDirection) {
                setCurrDirection(validDirection)
                const isSelectingWordCopy = [...selectedWordLocation, `${xindex}${yindex}`]
                setIsThisLetterSelected(true)
                setSelectedWordLocation(isSelectingWordCopy)
            } else {
                setIsSelectingWord(false)
            }
        } else {
            setIsSelectingWord(false)
        }
    }

    const stopSelect = () => {
        setIsSelectingWord(false)
        setCurrDirection(false)
        setSelectedWordLocation([''])
    }
    
    return (
        <span 
            className={isLetterFound ? 'word-letter word-letter--found' : isThisLetterSelected ? 'word-letter word-letter--selected' : 'word-letter'} 
            onMouseDown={() => startSelect()} 
            onMouseEnter={() => dragSelect()}
            onMouseUp={() => stopSelect()}
            onTouchStart={() => startSelect()} 
            onTouchMove={() => dragSelect()}  
            onTouchEnd={() => stopSelect()}
        >{letter}</span>
    )
}
export default WordLetter