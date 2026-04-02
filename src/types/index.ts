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
