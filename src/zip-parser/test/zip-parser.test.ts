import {ZipParser} from "../zip-parser";
import path from "path";
import * as fs from "fs";

describe("Zip service", () => {

    it("two-entries-from-zip-file-is-provided-successfully-with-right-path-passed", () => {
        const zipFileName = "testZipData.zip"

        const filePath = path.join(__dirname, zipFileName);
        const zip = new ZipParser(filePath)
        const zipFiles = zip.getZipEntries()
        console.log(zipFiles)

        expect(zipFiles.length).toBe(2)
    })


    it("two-entries-from-zip-file-is-extracted-successfully-with-right-path-passed",  async () => {
        const zipFileName = "testZipData.zip"

        const filePath = path.join(__dirname, zipFileName);
        const zip = new ZipParser(filePath)

        const zipExtractedPath = path.join(__dirname, '/temp');
        await zip.extractAll(zipExtractedPath)

        const filesNumber = await new Promise((resolve, reject) => {
            fs.readdir(zipExtractedPath, (err, files) => {
                if(err) {
                    reject(err)
                }

                resolve(files.length)
            });
        })

        expect(filesNumber).toBe(2)
    })

})