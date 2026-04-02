import { CardType } from './types'
import { filterCardListByPropertyList, getCardProperties } from './utils'

const find = (
    allcards: Array<CardType>,
    searchValue: string
): Array<CardType> => {
    var result: Array<CardType> = allcards

    const cardSets = getCardProperties('s', searchValue)
    const cardNumbers = getCardProperties('n', searchValue)
    const cardColors = getCardProperties('c', searchValue)
    const cardCategories = getCardProperties('t', searchValue)
    const cardEffects = getCardProperties('e', searchValue)
    const cardNames = getCardProperties('a', searchValue)

    const lowercaseSearchValue = searchValue.toLowerCase()

    result = filterCardListByPropertyList(result, cardSets, 'code')
    result = filterCardListByPropertyList(result, cardNumbers, 'code')
    result = filterCardListByPropertyList(result, cardColors, 'color')
    result = filterCardListByPropertyList(result, cardCategories, 'category')
    result = filterCardListByPropertyList(result, cardEffects, 'effects')
    result = filterCardListByPropertyList(result, cardNames, 'name')

    if (
        [
            ...cardSets,
            ...cardNumbers,
            ...cardColors,
            ...cardCategories,
            ...cardEffects,
            ...cardNames,
        ].length <= 0
    ) {
        result = result.filter((card) => {
            const lowercaseColor = card.color.map((color) =>
                color.toLowerCase()
            )
            const lowercaseTypes = card.types.map((type) => type.toLowerCase())

            return (
                card.attribute.toLowerCase().includes(lowercaseSearchValue) ||
                card.category.toLowerCase().includes(lowercaseSearchValue) ||
                card.code.toLowerCase().includes(lowercaseSearchValue) ||
                lowercaseColor.includes(lowercaseSearchValue) ||
                card.cost.toLowerCase().includes(lowercaseSearchValue) ||
                card.counter.toLowerCase().includes(lowercaseSearchValue) ||
                card.effects.toLowerCase().includes(lowercaseSearchValue) ||
                card.life.toLowerCase().includes(lowercaseSearchValue) ||
                card.name.toLowerCase().includes(lowercaseSearchValue) ||
                card.power.toLowerCase().includes(lowercaseSearchValue) ||
                card.rarity.toLowerCase().includes(lowercaseSearchValue) ||
                lowercaseTypes.includes(lowercaseSearchValue)
            )
        })
    }

    return result
}

export { find }
