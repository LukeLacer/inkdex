import { Card, DeckCard } from './types'
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

const findCards = (allCards: Array<Card>, cardList: string): DeckCard[] => {
    let deckLIstSplit = cardList.split('\n').filter(x => x)

    return deckLIstSplit.map(cardString => {
        const index = cardString.indexOf(' ');

        if (index !== -1) {
            const quantity = Number (cardString.slice(0, index));
            const cardName = cardString.slice(index + 1);
            const cardObj = findCardByName(allCards, cardName)

            if (!cardObj) throw new Error('Something went wrong with decklist parser')

            return { quantity, card: cardObj }
        } else throw new Error('Something went wrong with decklist parser')
    })
}

export { find, findCardByName, findCards }
