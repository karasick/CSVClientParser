import { DOUBLE_VERTICAL_BAR_DELIMITER } from './consts'
import { createReadStream } from 'fs'

const csvParser = require('csv-parser')

class CsvParserService {

    private csvParserOptions : any = {
        separator: DOUBLE_VERTICAL_BAR_DELIMITER
    }

    async parseCsvFile (filePath: string, headers: string[] = []): Promise<any> {
        try {
            console.log(filePath)

            const records: any = []

            if (headers.length >= 1) {
                this.csvParserOptions.headers = headers
                this.csvParserOptions.skipLines = 1
            }

            return new Promise((resolve, reject) => {
                createReadStream(filePath)
                    .pipe(csvParser(this.csvParserOptions))
                    .on('data', (data: any) => {
                        records.push(data)
                    })
                    .on('error', reject)
                    .on('end', () => {
                        resolve(records)
                    });
            })
        }
        catch (e) {
            console.error(e)
            throw new Error('File parsing error.')
        }
    }

    async parseCsvStream (csvSteam: NodeJS.ReadableStream, transform?: (rawData: any) => any): Promise<any> {
        return new Promise((resolve, reject) => {
            const records: any = []

            csvSteam
                .pipe(csvParser(this.csvParserOptions))
                .on('data', (data: any) => {
                    if (transform == null) {
                        records.push(data)
                        return
                    }

                    const transformedData = transform(data)
                    records.push(transformedData)
                })
                .on('error', reject)
                .on('end', () => {
                    resolve(records)
                })
        })
    }
}

export const csvService = new CsvParserService()