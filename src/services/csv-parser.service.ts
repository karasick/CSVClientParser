import {DOUBLE_VERTICAL_BAR_DELIMITER} from "./consts";

const csvParser = require('csv-parser')
import * as fs from "fs";

class CsvParserService {
    async parseData(filePath: string, headers: string[] = []): Promise<any> {
        try {
            console.log(filePath);

            const records: any = [];

            const csvParserOptions : any = {
                separator: DOUBLE_VERTICAL_BAR_DELIMITER
            }

            if(headers.length >= 1) {
                csvParserOptions.headers = headers
                csvParserOptions.skipLines = 1
            }

            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csvParser(csvParserOptions))
                    .on('data', (data: any) => {
                        records.push(data)
                    })
                    .on('error', reject)
                    .on('end', resolve);
            })

            // console.log(records)
            return records
        }
        catch (e) {
            console.error(e)
            throw new Error('File parsing error.')
        }
    }
}

export const csvService = new CsvParserService()