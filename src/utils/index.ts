import { homeStrings, headerStrings, changeTheme, myDecksStrings, deckBuilderStrings, deckViewerStrings } from './strings'
import { unzipPublicFile, getArticleFile } from './readers'
import { parseCSVToJSON } from './parser'
import { saveDeck, getDecks, getDeckByTitleVersion } from './storage'

const getClass = (
    newClass: string | undefined,
    originalClass: string
): string => {
    return newClass ? newClass + " " + originalClass : originalClass
}

export { homeStrings, headerStrings, getArticleFile, unzipPublicFile, parseCSVToJSON, changeTheme, getClass, saveDeck, getDecks, getDeckByTitleVersion, myDecksStrings, deckBuilderStrings, deckViewerStrings }