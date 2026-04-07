import { Deck } from "../searchEngine/types";

export const saveDeck = (deck: Deck, edit: boolean) => {
	const savedDecks = localStorage.getItem('decks')

	const timestamp = new Date().toISOString()

	if (!savedDecks) {
		deck.created = timestamp
		localStorage.setItem('decks', JSON.stringify([deck]))
	}
	else {
		const parsedSavedDecks = JSON.parse(savedDecks) as Deck[]

		const previousVersion = parsedSavedDecks.find(d => d.title === deck.title && d.version === deck.version)

		if (previousVersion) {
			if (!edit) throw new Error('This deck already exists!')

			if (
				deck.decklist === previousVersion.decklist
				&& deck.description === previousVersion.description
				&& deck.maybeboard === previousVersion.maybeboard
				&& deck.title === previousVersion.title
				&& deck.version === previousVersion.version
			) throw new Error('No changes were made to the deck!')

			deck.lastModified = timestamp

			deck.changeHistory = addChangeHistoryToDeck(deck, previousVersion, timestamp)

			localStorage.setItem(
				'decks',
				JSON.stringify([
					...parsedSavedDecks.filter(d => !(d.title === deck.title && d.version === deck.version)),
					deck
				])
			)
		} else {
			deck.created = timestamp
			localStorage.setItem('decks', JSON.stringify([...parsedSavedDecks, deck]))
		}

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

export const addChangeHistoryToDeck = (newDeck: Deck, previousVersion: Deck, timestamp: string) => {

	newDeck.changeHistory = previousVersion.changeHistory || []
	newDeck.changeHistory.push(timestamp)

	if (newDeck.version !== previousVersion.version)
		newDeck.changeHistory?.push('Versão alterada')
	if (newDeck.title !== previousVersion.title)
		newDeck.changeHistory?.push('Titulo alterado')
	if (newDeck.description !== previousVersion.description)
		newDeck.changeHistory?.push('Descrição alterada')
	if (newDeck.decklist !== previousVersion.decklist)
		newDeck.changeHistory?.push(checkCardlistDifferences(newDeck.decklist, previousVersion.decklist))
	if (newDeck.maybeboard !== previousVersion.maybeboard)
		newDeck.changeHistory?.push(checkCardlistDifferences(newDeck.maybeboard, previousVersion.maybeboard))

	newDeck.changeHistory.push('-------------------')

	return newDeck.changeHistory
}

export const parseCardList = (cardList: string): { quantity: number, cardName: string }[] => {
	let cardLIstSplited = cardList.split('\n').filter(x => x)

	return cardLIstSplited.map(cardString => {
		const index = cardString.indexOf(' ');

		if (index !== -1) {
			const quantity = Number (cardString.slice(0, index));
			const cardName = cardString.slice(index + 1);

			return { quantity, cardName }
		} else throw new Error('Something went wrong with decklist parser')
	})
}

export const checkCardlistDifferences = (newDeck: string, previousVersion: string): string => {
	let diff = ''
	const newDeckParsed = parseCardList(newDeck)
	const previousVersionParsed = parseCardList(previousVersion)

	newDeckParsed.forEach(card => {
		const previousCard = previousVersionParsed.find(c => c.cardName === card.cardName)

		if (!previousCard) diff += `+${card.quantity}x ${card.cardName}\n`
		else if (previousCard.quantity < card.quantity)
			diff += `+${card.quantity - previousCard.quantity}x ${card.cardName}\n`
		else if (previousCard.quantity > card.quantity)
			diff += `-${previousCard.quantity - card.quantity}x ${card.cardName}\n`
	})

	previousVersionParsed.forEach(card => {
		const newCard = newDeckParsed.find(c => c.cardName === card.cardName)

		if (!newCard) diff += `-${card.quantity}x ${card.cardName}\n`
	})

	return diff
}