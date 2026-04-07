import { Deck } from "../searchEngine/types";

export const saveDeck = (deck: Deck) => {
	const savedDecks = localStorage.getItem('decks')

	if (!savedDecks)
		localStorage.setItem('decks', JSON.stringify([deck]))
	else {
		const parsedSavedDecks = JSON.parse(savedDecks) as Deck[]
		
		if (parsedSavedDecks.find(d => d.title === deck.title && d.version === deck.version))
			throw new Error('This deck already exists!')

		localStorage.setItem('decks', JSON.stringify([...parsedSavedDecks, deck]))
	}
}

export const getDecks = (): Deck[] => {
	const savedDecks = localStorage.getItem('decks')

	if(savedDecks)
		return JSON.parse(savedDecks) as Deck[]
	else return []
}