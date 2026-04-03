import { Card } from './types'

export const propertyCode = [
    { property: "Abilities", code: ['b', 'abilities'], type: "string" },
    { property: "Artist", code: ['a', 'artist'], type: "string" },
    { property: "Body_Text", code: ['tx', 'text'], type: "string" },
    { property: "Card_Variants", code: ['cv', 'variants'], type: "string" },
    { property: "Classifications", code: ['c', 'classification'], type: "string" },
    { property: "Color", code: ['co', 'color'], type: "string" },
    { property: "Cost", code: ['cs', 'cost'], type: "number" },
    { property: "Flavor_Text", code: ['fl', 'flavor'], type: "string" },
    { property: "Franchise", code: ['f', 'franchise'], type: "string" },
    { property: "Inkable", code: ['i', 'inkable'], type: "boolean" },
    { property: "Lore", code: ['l', 'lore'], type: "number" },
    { property: "Move_Cost", code: ['m', 'movecost'], type: "number" },
    { property: "Name", code: ['n', 'name'], type: "string" },
    { property: "Rarity", code: ['r', 'rarity'], type: "string" },
    { property: "Strength", code: ['s', 'strength'], type: "number" },
    { property: "Type", code: ['t', 'type'], type: "string" },
    { property: "Willpower", code: ['w', 'willpower'], type: "number" },
    { property: "prints", code: ['p', 'prints'], type: "array" },
]

export const parseSearchString = (searchValue: string) => {
    let searchValueArray: string[] = []

    searchValue.trim().split(':').forEach((value, index) => {
        if (value[0] === '"') {
            searchValueArray.push(value.slice(1).split('"')[0].trim())
            searchValueArray.push(value.slice(1).split('"')[1].trim())
        } else if (value.includes(" ")) {
            searchValueArray.push(...value.split(' '))
        }else searchValueArray.push(value.trim())
    })

    searchValueArray = searchValueArray.filter(i => i.length !== 0)

    if (searchValueArray.length % 2 !== 0) throw new Error('Search incorrectly written')

    const searchItems: { property: string | undefined; searchValue: string }[] = []

    searchValueArray.forEach((property, index) => {
        if (index % 2 !== 0) return

        searchItems.push({
            property,
            searchValue: searchValueArray[index+1]
        })
    })

    return searchItems.map(({ property, searchValue }) => {
        return {
            property: propertyCode.find(item => item.code.includes(property!))?.property,
            searchValue
        }
    })
}

//TODO: FIX THIS FUNCTION TO USE IT
export const filterCardListByPropertyList = (
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