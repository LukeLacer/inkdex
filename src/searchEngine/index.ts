import { Card } from './types'
import { filterCardListByPropertyList, getCardProperties } from './utils'

const find = (
    allcards: Array<Card> | undefined,
    searchValue: string
): Array<Card> | undefined => {
    var result: Array<Card> | undefined = allcards

    const defaultCard: Card = {
        Abilities: 'string',
        Artist: 'string',
        Body_Text: 'string',
        Card_Variants: 'string',
        Classifications: 'string',
        Color: 'string',
        Cost: 0,
        Flavor_Text: 'string',
        Franchise: 'string',
        Image: 'string',
        Inkable: true,
        Lore: 0,
        Move_Cost: 0,
        Name: 'string',
        Rarity: 'string',
        Strength: 0,
        Type: 'string',
        Willpower: 0,
        prints: ['string', 'string'],
    }

    for (const [key, value] of Object.entries(defaultCard)) {
        const isArr = Object.prototype.toString.call(value) === '[object Array]';
        const type = isArr ? 'array' : typeof value

        console.log(`${key}: ${value} -> ${type} |${typeof key}|`);
    }

    const cardSets = getCardProperties('s', searchValue)
    const cardNumbers = getCardProperties('n', searchValue)
    const cardColors = getCardProperties('c', searchValue)
    const cardCategories = getCardProperties('t', searchValue)
    const cardEffects = getCardProperties('e', searchValue)
    const cardNames = getCardProperties('a', searchValue)

    const lowercaseSearchValue = searchValue.toLowerCase()

    result = filterCardListByPropertyList(result, cardSets, 'Name')
    result = filterCardListByPropertyList(result, cardNumbers, 'Name')
    result = filterCardListByPropertyList(result, cardColors, 'Name')
    result = filterCardListByPropertyList(result, cardCategories, 'Name')
    result = filterCardListByPropertyList(result, cardEffects, 'Name')
    result = filterCardListByPropertyList(result, cardNames, 'Name')

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
        if (!result?.length) return
        result = result!.filter((card) => {
            const lowercaseColor = card.prints.map((color) =>
                color.toLowerCase()
            )
            const lowercaseTypes = card.prints.map((type) => type.toLowerCase())

            return (
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                lowercaseColor.includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                card.Name.toLowerCase().includes(lowercaseSearchValue) ||
                lowercaseTypes.includes(lowercaseSearchValue)
            )
        })
    }

    return result
}

export { find }
