import Papa from 'papaparse'

const parseCSVToJSON = (csvString: string | undefined) => {
    let jsonToReturn = {}
    Papa.parse(csvString!, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            jsonToReturn = results.data
        },
    })
    return jsonToReturn
}

const getClass = (
    newClass: string | undefined,
    originalClass: string
): string => {
    return newClass ? newClass + " " + originalClass : originalClass
}

export { parseCSVToJSON, getClass }
