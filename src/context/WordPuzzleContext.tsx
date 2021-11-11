import { createContext, useState, FC, ReactElement } from 'react';
import wordData from './../assets/data/words.json'
import {WordPuzzle} from './types'

interface WordPuzzleContext {
  currWordPuzzle: WordPuzzle
  setCurrWordPuzzle: (value: WordPuzzle) => void,
  currWordPuzzleIndex: number,
  setCurrWordPuzzleIndex: (value: number) => void,
  currSolvedWords: string[]
  setCurrSolvedWords: (value: string[]) => void,
  solvedWordPuzzles: string[],
  setSolvedWordPuzzles: (value: string[]) => void,
  allPuzzlesCompleted: boolean,
  setAllPuzzlesCompleted: (value: boolean) => void,
  wordPuzzles: WordPuzzle[]
}  

export const WordPuzzleContext = createContext<WordPuzzleContext>({
    currWordPuzzle: {
      source_language: '',
      word: '',
      character_grid: [['']],
      word_locations: {'' : ''},
      target_language: ''
    },
    setCurrWordPuzzle: () => null,
    currWordPuzzleIndex: 0,
    setCurrWordPuzzleIndex: () => null,
    currSolvedWords: [],
    setCurrSolvedWords: () => null,
    solvedWordPuzzles: [],
    setSolvedWordPuzzles: () => null,
    allPuzzlesCompleted: false,
    setAllPuzzlesCompleted: () => null,
    wordPuzzles: [{
      source_language: '',
      word: '',
      character_grid: [['']],
      word_locations: {'' : ''},
      target_language: ''
    }],
})

interface WordPuzzleProviderProps {
  children: ReactElement,
}

const WordPuzzleProvider: FC<WordPuzzleProviderProps> = ({ children } : WordPuzzleProviderProps) => {
  const [wordPuzzles] = useState(wordData)
  const [solvedWordPuzzles, setSolvedWordPuzzles] = useState<string[]>([])
  const [currWordPuzzleIndex, setCurrWordPuzzleIndex] = useState<number>(0)
  const [currSolvedWords, setCurrSolvedWords] = useState<string[]>([])
  const [allPuzzlesCompleted, setAllPuzzlesCompleted] = useState<boolean>(false)
  const [currWordPuzzle, setCurrWordPuzzle] = useState<WordPuzzle>(wordPuzzles[currWordPuzzleIndex])

  return (
    <WordPuzzleContext.Provider
      value={{
        currWordPuzzle,
        setCurrWordPuzzle,
        currWordPuzzleIndex,
        setCurrWordPuzzleIndex,
        currSolvedWords,
        setCurrSolvedWords,
        solvedWordPuzzles,
        setSolvedWordPuzzles,
        allPuzzlesCompleted,
        setAllPuzzlesCompleted,
        wordPuzzles
      }}
    >
      {children}
    </WordPuzzleContext.Provider>
  );
};

export default WordPuzzleProvider
