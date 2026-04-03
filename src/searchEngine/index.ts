import { Card } from './types'
import { parseSearchString } from './utils'

//TODO: FINISH FIND
const find = (
    allcards: Array<Card>,
    searchValue: string
): any | undefined => {
    return parseSearchString(searchValue)
}

export { find }
