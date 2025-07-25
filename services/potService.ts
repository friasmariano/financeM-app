
import PotResponse from "@/types/responses/PotResponse";
import { apiResponseSchema } from "@/lib/schemas/apiResponseSchema";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { PotRequest } from "@/types/requests/PotRequest";
import { potSchema } from "@/lib/schemas/potSchema";
import { BaseService } from "./BaseService";
import { DefaultFactory } from "@/utils/DefaultFactory";
import potDefault from "@/defaults/potDefault";
import { z } from "zod";

export class PotService extends BaseService<PotResponse>{
    private static potResponseSchema = apiResponseSchema(potSchema);
    static defaultPot = DefaultFactory.cloneOf(potDefault);

    private static potListResponseSchema = apiResponseSchema(z.array(potSchema));

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

    async getAll(): Promise<ApiDefaultResponse<PotResponse[]>> {
        const response = await this.composeResponse('pots', 'GET');
        const jsonResponse = await this.jsonResponseParsing(response, []);

        const errors = this.listErrorHandler(
            response,
            jsonResponse,
            PotService.potListResponseSchema,
            []
        );

        if (errors)
            return errors;

        return {
            success: true,
            data: jsonResponse.json.data,
            message: jsonResponse.json.message,
            status: response.status
        }
    }

    async update(id: number, values: PotRequest): Promise<ApiDefaultResponse<PotResponse>> {
        const response = await this.composeResponse(`pots/${id}`, 'PUT', values);
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
        }

    }

    async delete(id: number): Promise<ApiDefaultResponse<PotResponse>> {
        const response = await this.composeResponse(`pots/${id}`, 'DELETE');
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
        }
    }
}