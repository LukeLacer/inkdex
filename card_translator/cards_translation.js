const fs = require('fs');
const { parse } = require('json2csv');
const parquet = require('parquetjs');

const oldFilePath = './cards.json';
const CSVCardsFilePath = './new_cards.csv';
const JSONCardsFilePath = './new_cards.json';
const ParquetCardsFilePath = './new_cards.parquet';
const setsFilePath = './sets.json';

const drawProgressBar = (progress) => {
    const barWidth = 30;
    const filledWidth = Math.floor(progress / 100 * barWidth);
    const emptyWidth = barWidth - filledWidth;
    const progressBar = '█'.repeat(filledWidth) + '▒'.repeat(emptyWidth);
    return `[${progressBar}] ${progress}%`;
}

const drawProgressLine = (partial, total) => {
    const progressPercentage = Math.floor(partial / total * 100) ;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: ${drawProgressBar(progressPercentage)}`);
}

const errorHandler = (err, filePath) => {
    if (err) {
        console.error(`Error writing ${filePath} file: ${err}`);
    } else {
        console.log(`File [${filePath}]\tsuccessfully saved`);
    }
}

const saveAsCSV = (data, filePath) => {
    const dataParsedAsCSV = parse(data);
    fs.writeFile(filePath, dataParsedAsCSV, 'utf8', (err) => errorHandler(err, filePath));
}

const saveAsJSON = (data, filePath) => {
    const dataParsedAsJSON = JSON.stringify(data);
    fs.writeFile(filePath, dataParsedAsJSON, 'utf8', (err) => errorHandler(err, filePath));
}

const saveAsParquet = async (data, filePath) => {
    const schema = new parquet.ParquetSchema({
        Artist: { type: 'UTF8' },
        Classifications: { type: 'UTF8', optional: true },
        Color: { type: 'UTF8' },
        Franchise: { type: 'UTF8' },
        Image: { type: 'UTF8' },
        Cost: { type: 'INT64' },
        Inkable: { type: 'BOOLEAN' },
        Name: { type: 'UTF8' },
        Type: { type: 'UTF8' },
        Lore: { type: 'INT64', optional: true },
        Rarity: { type: 'UTF8' },
        Flavor_Text: { type: 'UTF8', optional: true },
        Body_Text: { type: 'UTF8', optional: true },
        Willpower: { type: 'INT64', optional: true },
        Strength: { type: 'INT64', optional: true },
        prints: { type: 'UTF8', repeated: true }
    });

    const writer = await parquet.ParquetWriter.openFile(schema, filePath);

    for (const card of data)
        await writer.appendRow(card);

    await writer.close();
}

fs.readFile(oldFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        let oldCards = JSON.parse(data);

        let newCards = []
        let newSets = []

        const cardsTotal = oldCards.length;
        let count = 1;

        console.log('\nProcessing cards...\n');
        oldCards.forEach(card => {
            if (!newSets.some(obj => obj.Set_ID === card.Set_ID))
                newSets.push({
                    Set_ID: card.Set_ID,
                    Set_Name: card.Set_Name,
                    Set_Num: card.Set_Num
                });
            if (!newCards.some(obj => obj.Name === card.Name)) {
                const {
                    Set_Name,
                    Date_Added,
                    Set_Num,
                    Gamemode,
                    Date_Modified,
                    Card_Num,
                    Unique_ID,
                    Set_ID,
                    ...newCardObject
                } = card;
                newCards.push({ ...newCardObject, prints: [ card.Unique_ID ] });
            } else if (
                !newCards
                    .find(obj => obj.Name === card.Name)
                    .prints
                    .includes(card.Unique_ID)
                )
                newCards
                    .find(obj => obj.Name === card.Name)
                    .prints
                    .push(card.Unique_ID)

            drawProgressLine(count, cardsTotal)
            count++
        });

        console.log('\n\nProcessing complete. Saving files...');
        
        saveAsCSV(newCards, CSVCardsFilePath);
        //saveAsJSON(newCards, JSONCardsFilePath);
        //Parquet is currently heavier than CSV, maybe in the future
        //saveAsParquet(newCards, ParquetCardsFilePath);

        const orderedNewSets = newSets.sort((a, b) => a.Set_Num - b.Set_Num)

        saveAsJSON(orderedNewSets, setsFilePath)

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});