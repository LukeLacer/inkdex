import { Deck } from "../searchEngine/types";

export const saveDeck = (deck: Deck, edit: boolean) => {
	const savedDecks = localStorage.getItem('decks')

	if (!savedDecks)
		localStorage.setItem('decks', JSON.stringify([deck]))
	else {
		const parsedSavedDecks = JSON.parse(savedDecks) as Deck[]

		if (
			parsedSavedDecks.find(d => d.title === deck.title && d.version === deck.version)
		) {
			if (!edit) throw new Error('This deck already exists!')
			
			localStorage.setItem(
				'decks',
				JSON.stringify([
					...parsedSavedDecks.filter(d => !(d.title === deck.title && d.version === deck.version)),
					deck
				])
			)
			return
		}

		localStorage.setItem('decks', JSON.stringify([...parsedSavedDecks, deck]))
	}
}

export const getDecks = (): Deck[] => {
	const savedDecks = localStorage.getItem('decks')

	if(savedDecks)
		return JSON.parse(savedDecks) as Deck[]
	else return []
}

export const getDeckByTitleVersion = (title: string, version: string): Deck => {
	const savedDecks = localStorage.getItem('decks')

	if(savedDecks)
		return JSON.parse(savedDecks).find((deck: Deck) => deck.title === title && deck.version === version) as Deck
	else return {} as Deck
}