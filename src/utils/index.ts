import { homeStrings, headerStrings, changeTheme, myDecksStrings, deckBuilderStrings, deckViewerStrings } from './strings'
import { unzipPublicFile, getArticleFile } from './readers'
import { saveDeck, getDecks, getDeckByTitleVersion } from './storage'

const getClass = (
    newClass: string | undefined,
    originalClass: string
): string => {
    return newClass ? newClass + " " + originalClass : originalClass
}

export { homeStrings, headerStrings, getArticleFile, unzipPublicFile, changeTheme, getClass, saveDeck, getDecks, getDeckByTitleVersion, myDecksStrings, deckBuilderStrings, deckViewerStrings }