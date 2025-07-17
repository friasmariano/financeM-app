
import PotResponse from "@/types/responses/PotResponse";
import { apiResponseSchema } from "@/lib/schemas/apiResponseSchema";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { PotRequest } from "@/types/requests/potRequest";
import { potSchema } from "@/lib/schemas/potSchema";
import { BaseService } from "./BaseService";

export class PotService extends BaseService<PotResponse>{
    public API_BASE: string = process.env.NEXT_PUBLIC_API_BASE + '' || '';
    private static potResponseSchema = apiResponseSchema(potSchema);


    async create (values: PotRequest): Promise<ApiDefaultResponse<PotResponse>> {
        const response = await this.composeResponse('pots', 'POST', values);

        const jsonResponse = await this.jsonResponseParsing(response, this.defaultPotData());

        if (!jsonResponse.success && jsonResponse.fallback) {
            return jsonResponse.fallback;
        }

        const json = jsonResponse.json;

        const errorResponse = this.unSuccessfullResponse<PotResponse>(response, json, this.defaultPotData());
        if (errorResponse) {
            return errorResponse;
        }


        const result = PotService.potResponseSchema.safeParse(json);
        if (!result.success) {
            return {
                success: false,
                data: this.defaultPotData(),
                message: json.data,
                status: response.status
            }
        }

        return {
            success: result.success,
            data: result.data.data,
            message: result.data.message,
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