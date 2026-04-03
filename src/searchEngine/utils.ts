import { Card, propertyCode, search } from './types'

export const parseSearchString = (searchValue: string): search[] => {
    let searchValueArray: string[] = []

    const trimmedSearchValue = searchValue.trim().split(':')

    if (trimmedSearchValue.length === 1) return [{
        property: 'any',
        searchValue: trimmedSearchValue[0]
    }]

    trimmedSearchValue.forEach(value => {
        if (value[0] === '"') {
            searchValueArray.push(value.slice(1).split('"')[0].trim())
            searchValueArray.push(value.slice(1).split('"')[1].trim())
        } else if (value.includes(" ")) {
            searchValueArray.push(...value.split(' '))
        } else searchValueArray.push(value.trim())
    })

    searchValueArray = searchValueArray.filter(i => i.length !== 0)

    if (searchValueArray.length % 2 !== 0) throw new Error('Search incorrectly written')

    const searchItems: { property: string | undefined; searchValue: string }[] = []

    searchValueArray.forEach((property, index) => {
        if (index % 2 !== 0) return

        searchItems.push({
            property,
            searchValue: searchValueArray[index+1]
        } as search)
    })

    return searchItems.map(({ property, searchValue }) => {
        const correctProperty = propertyCode.find(item => item.code.includes(property!))?.property;

        if (!correctProperty) throw new Error(`Property ${property} do not exists`)
        if (!searchValue) throw new Error(`Some search value do not exists`)

        return {
            property: correctProperty,
            searchValue
        }
    })
}

export const filterCardListByPropertyList = (
    cardList: Array<Card> | undefined,
    searchPropertyList: Array<search>,
): Array<Card> | undefined => {
    if (!cardList || !searchPropertyList) return

    let result = cardList

    searchPropertyList.forEach(searchItem => {
        result = result.filter(v => {

            const searchValueLowerCase = searchItem.searchValue.toLowerCase()

            if (searchItem.property === 'any')
                return JSON.stringify(v).toLowerCase().includes(searchValueLowerCase)

            const propertyCardToCheck = v[searchItem.property as keyof Card]

            if (!propertyCardToCheck) return false

            const propertyData = propertyCode.find(value => value.property === searchItem.property)

            if (!propertyData) return false

            if (propertyData.type === 'string') return propertyCardToCheck.toString().toLowerCase().includes(searchValueLowerCase)
            if (propertyData.type === 'number') return +propertyCardToCheck === +searchValueLowerCase
            if (propertyData.type === 'array') return (propertyCardToCheck as string[]).find((item: string) => item.toLowerCase().includes(searchValueLowerCase))

            return false
        })
    })

    return result
}