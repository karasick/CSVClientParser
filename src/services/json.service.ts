import {writeFile} from "fs/promises";

class JsonService {
    async saveJson(jsonData: any, filePath: string): Promise<void> {
        try {
            await writeFile(filePath, JSON.stringify(jsonData))
        }
        catch (e) {
            console.error(e)
            throw new Error('File saving error.')
        }
    }
}

export const jsonService = new JsonService()