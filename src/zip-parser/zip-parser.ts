import AdmZip from "adm-zip"
import fs from "fs";

export class ZipParser {
    private zip: any;
    private tempPath: string = "";

    constructor(filePath: string) {
        console.log("Zip file path: " + filePath);

        this.zip = new AdmZip(filePath)
    }

    getZipEntries(): AdmZip.IZipEntry[] {
        return this.zip.getEntries()
    }

    // getFileStream(fileEntry: AdmZip.IZipEntry) {
    //     return this.zip.readFile(fileEntry)
    // }

    extractAll(destination: string): void {
        this.tempPath = destination
        this.zip.extractAllTo(destination, true)
        console.log("Files extracted to path: " + destination)
    }

    clearTemp() {
        fs.rmSync(this.tempPath, { recursive: true, force: true });
    }
}