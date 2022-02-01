import {ClientRaw} from "../../types/client-raw.type";
import {clientService} from "../client.service";
import {ClientDto} from "../../dtos/client.dto";

describe("Client service", () => {

    it("client-is-created-successfully-with-right-data-passed", () => {

        const rightRawJsonData: ClientRaw = {
            first_name:"Nancy",
            last_name:"Higgins",
            user:"nancy.higgins",
            email:"Nancy.Higgins@example.com",
            name: "Nancy Higgins",
            phone:"(871) 398-6828",
            cc:"ACN00005",
            amount: "90.78",
            date: "9/1/2110"
        }

        const rightClientDto: ClientDto = {
            name: "Higgins Nancy",
            phone:"+3808713986828",
            person: {
                firstName:"Nancy",
                lastName:"Higgins",
            },
            amount: 90.78,
            date: "2110-01-09",
            costCenterSum:"00005"
        }

        const clientDto = clientService.createClient(rightRawJsonData)

        expect(clientDto).toEqual(rightClientDto)
    })

    it.todo("clients-json-data-is-parsed-successfully-with-right-data-passed")

    it.todo("json-file-with-clients-is-saved-successfully-with-right-data-passed")
})