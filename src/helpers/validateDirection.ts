import {DIRECTIONS} from './../constants'

interface ValidateDirection {
    currDirection: string | boolean
    selectedWordLocation: string[]
    xindex: number
    yindex: number
}

const validateDirection = ({ currDirection, selectedWordLocation, xindex, yindex }: ValidateDirection) => {
    const lastSelectedLetter = {
        x: parseInt(selectedWordLocation[selectedWordLocation.length - 1][0]),
        y: parseInt(selectedWordLocation[selectedWordLocation.length - 1][1]),
    }

    //this is not ideal but could not think of the MATH to run this cleaner
    const checkRight = (lastSelectedLetter.x + 1 === xindex) && (lastSelectedLetter.y === yindex)
    const checkLeft = (lastSelectedLetter.x - 1 === xindex) && (lastSelectedLetter.y === yindex)
    const checkUp = (lastSelectedLetter.x === xindex) && (lastSelectedLetter.y - 1 === yindex)
    const checkDown = (lastSelectedLetter.x === xindex) && (lastSelectedLetter.y + 1 === yindex)
    const checkRightUp = (lastSelectedLetter.x + 1 === xindex) && (lastSelectedLetter.y - 1 === yindex)
    const checkRightDown = (lastSelectedLetter.x + 1 === xindex) && (lastSelectedLetter.y + 1 === yindex)
    const checkLeftUp = (lastSelectedLetter.x - 1 === xindex) && (lastSelectedLetter.y - 1 === yindex)
    const checkLeftDown = (lastSelectedLetter.x - 1 === xindex) && (lastSelectedLetter.y + 1 === yindex)

    switch(true) {
        case (!currDirection || currDirection === DIRECTIONS.RIGHT) && checkRight : console.log('right'); return DIRECTIONS.RIGHT
        case (!currDirection || currDirection === DIRECTIONS.LEFT) && checkLeft : console.log('left'); return DIRECTIONS.LEFT
        case (!currDirection || currDirection === DIRECTIONS.UP) && checkUp : console.log('up'); return DIRECTIONS.UP
        case (!currDirection || currDirection === DIRECTIONS.DOWN) && checkDown : console.log('down'); return DIRECTIONS.DOWN
        case (!currDirection || currDirection === DIRECTIONS.RIGHT_UP) && checkRightUp : console.log('right-up'); return DIRECTIONS.RIGHT_UP
        case (!currDirection || currDirection === DIRECTIONS.RIGHT_DOWN) && checkRightDown : console.log('right-down'); return DIRECTIONS.RIGHT_DOWN
        case (!currDirection || currDirection === DIRECTIONS.LEFT_UP) && checkLeftUp : console.log('left-up'); return DIRECTIONS.LEFT_UP
        case (!currDirection || currDirection === DIRECTIONS.LEFT_DOWN) && checkLeftDown : console.log('left-down'); return DIRECTIONS.LEFT_DOWN
        default : return false
    }
}

export default validateDirection