import { CardType } from '../types'
import lorcastApi from './api'

export const cardService = {
    getCardBySetAndNumber: async (
        set: string,
        number: string
    ): Promise<CardType> => {
        const response = await lorcastApi.get(`/cards/${set}/${number}`)
        return response.data
    },
    getCardsBySearchValue: async (
        valueToSearch: string
    ): Promise<CardType[]> => {
        const response = await lorcastApi.get(
            `/cards/search?q=${valueToSearch}`
        )
        return response.data.results
    },
}
