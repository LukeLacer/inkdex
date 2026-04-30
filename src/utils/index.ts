import { homeStrings, headerStrings, burgerMenuStrings, myDecksStrings, deckBuilderStrings, deckViewerStrings } from './strings'
import { unzipPublicFile } from './readers'
import { parseCSVToJSON } from './parser'
import { saveDeck, getDecks, getDeckByTitleVersion } from './storage'

const getClass = (
    newClass: string | undefined,
    originalClass: string
): string => {
    return newClass ? newClass + " " + originalClass : originalClass
}

export { homeStrings, headerStrings, unzipPublicFile, parseCSVToJSON, burgerMenuStrings, getClass, saveDeck, getDecks, getDeckByTitleVersion, myDecksStrings, deckBuilderStrings, deckViewerStrings }