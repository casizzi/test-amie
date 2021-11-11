export interface WordPuzzle {
    source_language: string
    word: string
    character_grid: string[][]
    word_locations: {
        [key: string]: string | undefined
    }
    target_language: string
}