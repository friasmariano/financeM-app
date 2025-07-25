import { BaseService } from "./BaseService";
import { budgetSchema } from "@/lib/schemas/BudgetSchema";
import BudgetResponse from "@/types/responses/BudgetResponse";
import { apiResponseSchema } from "@/lib/schemas/apiResponseSchema";
import budgetDefault from "@/defaults/budgetDefault";
import { DefaultFactory } from "@/utils/DefaultFactory";
import { z } from "zod";
import { BudgetRequest } from "@/types/requests/budgetRequest";
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";

export class BudgetService extends BaseService<BudgetResponse>{
    private static budgetResponseSchema = apiResponseSchema(budgetSchema);
    static defaultBudget = DefaultFactory.cloneOf(budgetDefault);

    private static budgetListResponseSchema = apiResponseSchema(z.array(budgetSchema));

    async create (values: BudgetRequest): Promise<ApiDefaultResponse<BudgetResponse>> {
        const response = await this.composeResponse('budgets', 'POST', values);
        const jsonResponse = await this.jsonResponseParsing(response, BudgetService.defaultBudget);

        const errors = this.errorHandler<BudgetResponse>(
            response,
            jsonResponse,
            BudgetService.budgetResponseSchema,
            BudgetService.defaultBudget
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

    async getAll(): Promise<ApiDefaultResponse<BudgetResponse[]>> {
        const response = await this.composeResponse('budgets', 'GET');
        const jsonResponse = await this.jsonResponseParsing(response, []);

        const errors = this.listErrorHandler(
            response,
            jsonResponse,
            BudgetService.budgetListResponseSchema,
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

    async update(id: number, values: BudgetRequest): Promise<ApiDefaultResponse<BudgetResponse>> {
        const response = await this.composeResponse(`budgets/${id}`, 'PUT', values);
        const jsonResponse = await this.jsonResponseParsing(response, BudgetService.defaultBudget);

        const errors = this.errorHandler<BudgetResponse>(
            response,
            jsonResponse,
            BudgetService.budgetResponseSchema,
            BudgetService.defaultBudget
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

    async delete(id: number): Promise<ApiDefaultResponse<BudgetResponse>> {
        const response = await this.composeResponse(`budgets/${id}`, 'DELETE');
        const jsonResponse = await this.jsonResponseParsing(response, BudgetService.defaultBudget);

        const errors = this.errorHandler<BudgetResponse>(
            response,
            jsonResponse,
            BudgetService.budgetResponseSchema,
            BudgetService.defaultBudget
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