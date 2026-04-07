import { Card, DeckCard, DeckCheckType, setsInCore } from './types'
import { parseSearchString, filterCardListByPropertyList, getCardByName } from './utils'
import sets from '../data/sets.json'

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
    let deckListSplit = cardList.split('\n').filter(x => x)

    return deckListSplit.map(cardString => {
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

const deckCheck = (allCards: Card[], decklist: string): DeckCheckType => {
    const parsedDecklist = findCards(allCards, decklist)
    let cardQuantity = 0
    let colors: any[] = []
    let deckHasError: boolean = false
    let deckFormat: string = "core"

    parsedDecklist.forEach(card => {
        cardQuantity += card.quantity
        colors = [...colors, ...card.card.Color.split(', ')]
        let cardFormat = "infinity"

        const cardPrints = JSON.parse(card.card.prints)

        cardPrints.forEach((print: string) => {

            if (sets.find(set => print.split('-')[0] === set.Set_ID && set.Set_Num >= setsInCore))
                cardFormat = "core"
        })

        if (cardFormat === "infinity")
            deckFormat = "infinity"
    }) 

    const uniqueColors = colors.filter((item, index) => colors.indexOf(item) === index)

    if (
        cardQuantity < 60
        || uniqueColors.length > 2
    ) deckHasError = true

    return {
        deckHasError,
        deckFormat,
        colors: uniqueColors,
        cardQuantity
    }
}

export { find, findCardByName, findCards, deckCheck }
