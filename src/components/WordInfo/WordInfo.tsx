import {useContext} from 'react';
import localeLanguage from '../../helpers/localeLanguage'
import {WordPuzzleContext} from '../../context/WordPuzzleContext'
import './WordInfo.scss'

const WordInfo = () => {
    const {currWordPuzzle, currSolvedWords} = useContext(WordPuzzleContext)
    const language = localeLanguage(currWordPuzzle.target_language)

    const renderTranslations = () => Object.values(currWordPuzzle.word_locations).map((word, index) => {
        return (
            word ? 
            <div key={word+index} className="word-info__item"> 
                { Object.values(currSolvedWords).includes(word) ? 
                    <h4 key={word} className="word-info__item word-info__item__value word-info__item word-info__item__value--success">{word}</h4> 
                    :
                    <h4 key={word} className="word-info__item word-info__item__value word-info__item word-info__item__value--highlight">{[...word].map((_letter) => '_')}</h4> 
                }
            </div>
            : null
        )    
    })

    return (
        <div className="word-info">
            <div className="word-info__item">
                <h4 className="word-info__item__label word-info__item__label--word">Word</h4>
                <h4 className="word-info__item word-info__item__value">{currWordPuzzle.word}</h4>
            </div>
            <div className="word-info__item">
                <h4 className="word-info__item__label">Language</h4>
                <h4 className="word-info__item word-info__item__value">{language}</h4>
            </div>
            <div>
                <h4 className="word-info__item__label">Translations</h4>
                {renderTranslations()}
            </div>
        </div>
    )
}
export default WordInfo