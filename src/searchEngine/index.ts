import { Card } from './types'
import { parseSearchString, filterCardListByPropertyList } from './utils'

const find = (
    allCards: Array<Card>,
    searchValue: string
): any | undefined => {
    return filterCardListByPropertyList(
        allCards,
        parseSearchString(searchValue)
    )
}

export { find }
