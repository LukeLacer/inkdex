import Papa from 'papaparse'

const parseCSVToJSON = (csvString: string|undefined) => {
  let jsonToReturn = {}
    Papa.parse(csvString!, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        jsonToReturn = results.data
      }
    });
  return jsonToReturn
};

export { parseCSVToJSON }