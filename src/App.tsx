import {useContext} from 'react';
import {WordPuzzleContext} from './context/WordPuzzleContext'
import {CSSTransition} from 'react-transition-group'

import WordGrid from './components/WordGrid/WordGrid'
import WordInfo from './components/WordInfo/WordInfo'
import PuzzleInfo from './components/PuzzleInfo/PuzzleInfo'
import PuzzleCompletedPopup from './components/PuzzleCompletedPopup/PuzzleCompletedPopup'
import Modal from './components/Modal/Modal'
import './App.scss';


function App() {
  const {allPuzzlesCompleted} = useContext(WordPuzzleContext)
  return (
    <div className="app">
      <div className="app__wrapper">
        <WordInfo />
        <WordGrid />
        <PuzzleInfo />
        <CSSTransition in={allPuzzlesCompleted} classNames="appear" unmountOnExit timeout={0}>
          <Modal>
            <PuzzleCompletedPopup />
          </Modal>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
