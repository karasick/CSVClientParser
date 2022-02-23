import { writeFile } from 'fs/promises'

class JsonService {
  async saveJson(jsonData: any[], filePath: string): Promise<void> {
    const stringifyData = JSON.stringify(jsonData)
    await writeFile(filePath, stringifyData)
  }
}

export const jsonService = new JsonService()
