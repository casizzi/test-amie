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
        case (!currDirection || currDirection === DIRECTIONS.RIGHT) && checkRight : return DIRECTIONS.RIGHT
        case (!currDirection || currDirection === DIRECTIONS.LEFT) && checkLeft : return DIRECTIONS.LEFT
        case (!currDirection || currDirection === DIRECTIONS.UP) && checkUp : return DIRECTIONS.UP
        case (!currDirection || currDirection === DIRECTIONS.DOWN) && checkDown : return DIRECTIONS.DOWN
        case (!currDirection || currDirection === DIRECTIONS.RIGHT_UP) && checkRightUp : return DIRECTIONS.RIGHT_UP
        case (!currDirection || currDirection === DIRECTIONS.RIGHT_DOWN) && checkRightDown : return DIRECTIONS.RIGHT_DOWN
        case (!currDirection || currDirection === DIRECTIONS.LEFT_UP) && checkLeftUp : return DIRECTIONS.LEFT_UP
        case (!currDirection || currDirection === DIRECTIONS.LEFT_DOWN) && checkLeftDown : return DIRECTIONS.LEFT_DOWN
        default : return false
    }
}

export default validateDirection