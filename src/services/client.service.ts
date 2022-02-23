import { ClientDto } from '../dtos/client.dto'
import { csvService } from './csv-parser.service'
import { ClientRaw } from '../types/client-raw.type'
import { PersonDto } from '../dtos/person.dto'
import { jsonService } from './json.service'

class ClientService {
  createClient(clientRaw: ClientRaw): ClientDto {
    const person: PersonDto = {
      firstName: clientRaw.first_name,
      lastName: clientRaw.last_name
    }

    const client: ClientDto = {
      name: `${person.lastName} ${person.firstName}`,
      phone: this.getPhoneNumber(clientRaw.phone),
      person,
      amount: Number(clientRaw.amount),
      date: this.getDate(clientRaw.date),
      costCenterSum: this.getCostCenterSum(clientRaw.cc)
    }

    return client
  }

  async getClients(fileName: string): Promise<ClientDto[]> {
    const clientsRaw = await csvService.parseCsvFile(fileName)

    const clients = clientsRaw.map((clientRaw: ClientRaw) => this.createClient(clientRaw))

    return clients
  }

  async getRawClientsFromStream(cvsStream: NodeJS.ReadableStream): Promise<ClientRaw[]> {
    const clientsRaw = await csvService.parseCsvStream(cvsStream)

    return clientsRaw
  }

  async getClientsFromStream(cvsStream: NodeJS.ReadableStream): Promise<ClientDto[]> {
    const clients = await csvService.parseCsvStream(cvsStream, this.createClient.bind(this))

    return clients
  }

  async saveClients(clients: ClientDto[], filePath: string): Promise<string> {
    await jsonService.saveJson(clients, filePath)

    return filePath
  }

  private getPhoneNumber(phoneRaw: string): string {
    const countryCode = this.getCountryCode()
    // Replace all symbols that is not [0-9] with ''
    const phone = phoneRaw.replace(/[^0-9]/g, '')

    return `+${countryCode}${phone}`
  }

  private getCountryCode(): string {
    return '380'
  }

  private getCostCenterSum(cc: string): string {
    return cc.replace('ACN', '')
  }

  private getDate(dateRaw: string): string {
    const [day, month, year] = dateRaw.split('/')

    if (!day || !month || !year) {
      return 'Nan'
    }

    const date = new Date(Number(year), Number(month) - 1, Number(day))

    const currentDate = ('0' + date.getDate()).slice(-2)
    const currentMonth = ('0' + (date.getMonth() + 1)).slice(-2)
    const currentYear = `${date.getFullYear()}`

    return `${currentYear}-${currentMonth}-${currentDate}`
  }
}

export const clientService = new ClientService()
