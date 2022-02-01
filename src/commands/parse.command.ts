import type { Arguments, CommandBuilder } from 'yargs';
import {ZipParser} from "../zip-parser/zip-parser";
import {clientService} from "../services/client.service";
import {ClientDto} from "../dtos/client.dto";
import path from "path";

type Options = {
    inputName: string;
    outputName: string
};

export const command: string = 'parse <inputName> [--outputName=<outputName>]';
export const desc: string = 'Parse zip archive <inputName> with csv files to json file <outputName>';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .options({
            outputName: {
                alias: "o",
                type: 'string',
                default: 'result.json'
            },
        })
        .positional('inputName', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
    const { inputName, outputName } = argv;
    const processFolder = process.cwd()

    const zipPath = path.join(processFolder, String(inputName));
    const zip = new ZipParser(zipPath)

    const zipEntries = zip.getZipEntries()

    const zipExtractedPath = path.join(processFolder, '/temp');
    zip.extractAll(zipExtractedPath)

    const clients: ClientDto[] = []
    for (const zipEntry of zipEntries) {
        const entryPath = path.join(zipExtractedPath, zipEntry.name);
        const entryClients = await clientService.getClients(entryPath)

        clients.push(...entryClients)
    }

    const jsonPath = path.join(processFolder, String(outputName));
    await clientService.saveClients(clients, jsonPath)

    zip.clearTemp()
    process.stdout.write("Json file is successfully stored on path: " + jsonPath);

    process.exit(0);
};