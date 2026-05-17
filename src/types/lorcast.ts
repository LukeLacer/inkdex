export interface CardType {
    id: string
    name: string
    version: string
    layout: string
    released_at: Date
    image_uris: ImageUris
    cost: number
    inkwell: boolean
    ink: string
    type: string[]
    classifications: string[]
    text: string
    move_cost: null
    strength: number
    willpower: number
    lore: number
    rarity: string
    illustrators: string[]
    collector_number: string
    lang: string
    flavor_text: null
    tcgplayer_id: number
    legalities: Legalities
    set: Set
    prices: { [key: string]: number | null }
}

export interface ImageUris {
    digital: Digital
}

export interface Digital {
    small: string
    normal: string
    large: string
}

export interface Legalities {
    core: string
}

export interface Set {
    id: string
    code: string
    name: string
}