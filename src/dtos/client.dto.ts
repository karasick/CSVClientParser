import { PersonDto } from './person.dto'

export interface ClientDto {
    name: string
    phone: string
    person: PersonDto
    amount: number
    date: string
    costCenterSum: string
}