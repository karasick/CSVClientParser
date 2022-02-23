import type { Arguments, CommandBuilder } from 'yargs'
import { clientService } from '../services/client.service'
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { loadAsync } from 'jszip'
import EventEmitter from 'eventemitter3'
import { fromEvent, bufferCount, map } from 'rxjs'
import { ClientDto } from '../dtos/client.dto'

type Options = {
  inputName: string
  outputName: string
}

export const command = 'parse <inputName> [--outputName=<outputName>]'
export const desc = 'Parse zip archive <inputName> with csv files to json file <outputName>'

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      outputName: {
        alias: 'o',
        type: 'string',
        default: 'result.json'
      }
    })
    .positional('inputName', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { inputName, outputName } = argv
  const processRoot = process.cwd()
  const hub = new EventEmitter()

  const zipPath = resolve(processRoot, String(inputName))
  const jsonPath = resolve(processRoot, String(outputName))

  const receiveEventName = 'receive'
  const $receive = fromEvent<ClientDto[]>(hub, receiveEventName)
  $receive
    .pipe(
      bufferCount(2),
      map(([firstArr, secondArr]) => firstArr.concat(secondArr))
    )
    .subscribe(async (clients) => {
      await clientService.saveClients(clients, jsonPath)
      console.log(`Json file is successfully stored on path: ${jsonPath}`)

      process.exit(0)
    })

  const archiveData = await readFile(zipPath)
  const { files } = await loadAsync(archiveData)

  for (const [fileName, csvObject] of Object.entries(files)) {
    const csvReadStream = csvObject.nodeStream()
    const csvData = await clientService.getClientsFromStream(csvReadStream)
    hub.emit(receiveEventName, csvData)
  }
}
