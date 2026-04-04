import { Card } from './types'
import { parseSearchString, filterCardListByPropertyList, getCardByName } from './utils'

const find = (
    allCards: Array<Card>,
    searchValue: string
): any | undefined => {
    return filterCardListByPropertyList(
        allCards,
        parseSearchString(searchValue)
    )
}

const findCardByName = (allCards: Array<Card>, cardName: string): Card | undefined => {
    return getCardByName(allCards, cardName)
}

export { find, findCardByName }
