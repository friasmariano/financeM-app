
import PotResponse from "@/types/responses/PotResponse";
import { apiResponseSchema } from "@/lib/schemas/apiResponseSchema";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { PotRequest } from "@/types/requests/potRequest";
import { potSchema } from "@/lib/schemas/potSchema";
import { BaseService } from "./BaseService";

export class PotService extends BaseService<PotResponse>{
    private static potResponseSchema = apiResponseSchema(potSchema);


    async create (values: PotRequest): Promise<ApiDefaultResponse<PotResponse>> {
        const response = await this.composeResponse('pots', 'POST', values);
        const jsonResponse = await this.jsonResponseParsing(response, this.defaultPotData());

        const errors = this.errorHandler<PotResponse>(
            response,
            jsonResponse,
            PotService.potResponseSchema,
            this.defaultPotData()
        );

        if (errors)
            return errors;

        return {
            success: true,
            data: jsonResponse.json.data,
            message: jsonResponse.json,
            status: response.status
        };
    }

    private static readonly EMPTY_POT: PotResponse = {
        id: 0,
        name: '',
        goalAmount: 0,
        currentAmount: 0,
        userId: 0
    }

    defaultPotData(): PotResponse {
        return PotService.EMPTY_POT;
    }
}