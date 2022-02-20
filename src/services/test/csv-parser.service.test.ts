import { csvService } from '../csv-parser.service'
import { resolve } from 'path'

describe('CsvParser service', () => {

    const rightRawJsonData = [
        {
            first_name: 'Nancy',
            last_name: 'Higgins',
            user: 'nancy.higgins',
            email: 'Nancy.Higgins@example.com',
            name: 'Nancy Higgins',
            phone: '(871) 398-6828',
            cc: 'ACN00005',
            amount: '90.78',
            date: '9/1/2110'
        },
        {
            first_name: 'Glen',
            last_name: 'Massey',
            user: 'glen.massey',
            email: 'Glen.Massey@example.com',
            name: 'Glen Massey',
            phone: '(837) 435-3518',
            cc: 'ACN00008',
            amount: '68.07',
            date: '4/5/2088'
        }
    ]

    it('file-is-parsed-successfully-with-right-data-passed',  async () => {
        const rightTestDataFileName = 'rightTestData.csv'
        const filePath = resolve(__dirname, rightTestDataFileName);
        console.log(filePath)

        const testRaw = await csvService.parseCsvFile(filePath)
        console.log('testRaw')
        console.log(testRaw)

        expect(testRaw).toMatchObject(rightRawJsonData);
    })
})