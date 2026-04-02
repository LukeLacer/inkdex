import JSZip from 'jszip';

const unzipPublicFile = async (filePath: string): Promise<string | undefined> => {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    const zip = await JSZip.loadAsync(arrayBuffer);
    let content = '';

    const filePromises: any[] = [];

    zip.forEach((relativePath, file) => {
        if (!file.dir) {
            filePromises.push(file.async('string').then(fileContent => {
                content = fileContent;
            }));
        }
    });

    await Promise.all(filePromises);

    return content;
};

export { unzipPublicFile };