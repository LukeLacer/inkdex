import { Card } from './types'

const getCardProperties = (searchedProperty: string, searchValue: string) => {
    const cardSetRegexQuot = new RegExp(searchedProperty + ':"(.*?)"', 'g')
    const cardSetRegex = new RegExp(searchedProperty + ':(\\w+)\\b', 'g')

    const cardProperties: any[] = []

    searchValue.match(cardSetRegex)?.forEach((property) => {
        const correctEd = property.split(':')[1]
        if (!cardProperties.includes(correctEd)) cardProperties.push(correctEd)
    })

    searchValue.match(cardSetRegexQuot)?.forEach((property) => {
        const correctEd = property.split('"')[1]
        if (!cardProperties.includes(correctEd)) cardProperties.push(correctEd)
    })

    return cardProperties
}

const filterCardListByPropertyList = (
    cardList: Array<Card> | undefined,
    propertyList: Array<string>,
    property: keyof Card
): Array<Card> | undefined => {
    if (!cardList?.length) return
    var arrayToReturn = cardList

    propertyList.forEach((propertyValue) => {
        arrayToReturn = cardList.filter((card) => {
            var isTrue = false
            if (typeof card[property] === 'string') {
                if (
                    (card[property] as string)
                        .toLowerCase()
                        .includes(propertyValue.toLowerCase())
                )
                    isTrue = true
            } else {
                ;(card[property] as Array<string>).forEach(
                    (propertyArrayValue) => {
                        if (
                            propertyArrayValue
                                .toLowerCase()
                                .includes(propertyValue.toLowerCase())
                        )
                            isTrue = true
                    }
                )
            }

            return isTrue
        })
    })

    return arrayToReturn
}

const propertyCode = {
	Artist: ['a', 'artist'],
	Set: ['e', 'edition', 'set'],
	Classifications: ['c', 'classification'],
	Color: ['co', 'color'],
	Franchise: ['f', 'franchise'],
	Cost: [ 'ct', 'cost'],
	Inkable: ['i', 'inkable'],
	Name: ['n', 'name'],
	Type: ['t', 'type'],
	Lore: ['l', 'lore'],
	Rarity: ['r', 'rarity'],
	Flavor_Text: ['fl', 'flavor'],
	Card_Num: ['cn', 'number'],
	Body_Text: ['tx', 'text'],
	Willpower: ['w', 'willpower'],
	Strength: ['s', 'strength'],
}

export { getCardProperties, filterCardListByPropertyList, propertyCode }
