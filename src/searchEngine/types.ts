export type Card = {
    Abilities: string
    Artist: string
    Body_Text?: string
    Card_Variants: string
    Classifications?: string
    Color: string
    Cost: number
    Flavor_Text?: string
    Franchise: string
    Image: string
    Inkable: boolean
    Lore?: number
    Move_Cost: number
    Name: string
    Rarity: string
    Strength?: number
    Type: string
    Willpower?: number
    prints: string[]
}

export type Set = {
    Set_ID: string
    Set_Name: string
    Set_Num: number
}

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

export type search = {
    property: string,
    searchValue: string
}