import {ClientDto} from "../../dtos/client.dto";
import * as fs from "fs";
import {jsonService} from "../json.service";
import path from "path";

describe("Json service", () => {

        const rightJsonData: ClientDto[] = [
        {
            name: "Higgins Nancy",
            phone: "+388713986828",
            person: {
                firstName: "Nancy",
                lastName: "Higgins"
            },
            amount: 90.78,
            date: "2110-01-09",
            costCenterSum: "0005"
        },
        {
            name: "Massey Glen",
            phone: "+388374353518",
            person: {
                firstName: "Glen",
                lastName: "Massey"
            },
            amount: 68.07,
            date: "2088-04-05",
            costCenterSum: "00008"
        }
    ]

    it("file-is-saved-successfully-with-right-data-passed", async () => {
        const rightFileName = "testFile1.json"

        const filePath = path.join(__dirname, rightFileName);
        await jsonService.saveJson(rightJsonData, filePath)

        const isFileExists = fs.existsSync(filePath)

        expect(isFileExists).toBe(true);

        if(isFileExists) {
            const fileBuffer = fs.readFileSync(filePath)
            let fileData = JSON.parse(fileBuffer.toString());

            expect(fileData).toEqual(rightJsonData);

            // Clear created file
            fs.unlinkSync(filePath)
            console.log(`File deleted successfully on path: ${filePath}`)
        }
    })
})