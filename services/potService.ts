
import PotResponse from "@/types/responses/PotResponse";
import { apiResponseSchema } from "@/lib/schemas/apiResponseSchema";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { PotRequest } from "@/types/requests/potRequest";
import { potSchema } from "@/lib/schemas/potSchema";
import { BaseService } from "./BaseService";
import { DefaultFactory } from "@/utils/DefaultFactory";
import potDefault from "@/defaults/potDefault";

export class PotService extends BaseService<PotResponse>{
    private static potResponseSchema = apiResponseSchema(potSchema);
    static defaultPot = DefaultFactory.cloneOf(potDefault);

    async create (values: PotRequest): Promise<ApiDefaultResponse<PotResponse>> {
        const response = await this.composeResponse('pots', 'POST', values);
        const jsonResponse = await this.jsonResponseParsing(response, PotService.defaultPot);

        const errors = this.errorHandler<PotResponse>(
            response,
            jsonResponse,
            PotService.potResponseSchema,
            PotService.defaultPot
        );

        if (errors)
            return errors;

        return {
            success: true,
            data: jsonResponse.json.data,
            message: jsonResponse.json.message,
            status: response.status
        };
    }
}