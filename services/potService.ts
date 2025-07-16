
import PotResponse from "@/types/responses/PotResponse";
import { apiResponseSchema } from "@/lib/schemas/apiResponseSchema";
import { z } from 'zod';
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { PotRequest } from "@/types/requests/potRequest";
import { useAppDispatch } from "@/lib/hooks";
import { setHttpStatus } from "@/lib/features/auth/store/auth-slice";

const potSchema = z.object({
    id: z.number(),
    name: z.string(),
    goalAmount: z.number(),
    currentAmount: z.number(),
    userId: z.number()
});

function updateStatus (response: any) {
    const dispatch = useAppDispatch();

    dispatch(setHttpStatus({
        statusCode: response.status,
        errorMessage: response.message
    }))
}


export class PotService {
    public API_BASE: string = process.env.NEXT_PUBLIC_API_BASE + '' || '';
    private static potResponseSchema = apiResponseSchema(potSchema);

    // public async getAll() {

    // }

    async create (values: PotRequest): Promise<ApiDefaultResponse<PotResponse>> {
        const response = await fetch(`${this.API_BASE}/pots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: values.name,
                goalAmount: values.goalAmount,
                currentAmount: values.currentAmount
            })
        });

        let json;

        try {
            json = await response.json();
        } catch(error: any) {
            alert("Status Code:" + response.status);

            updateStatus(response)

            throw error;
        }


        if (!response.ok) {
            const error: any = new Error('Request failed!');
            error.status = response.status;
            error.body = json;

            console.log(response)
            throw error;
        } else {
            console.log(response);
        }

        console.log("Status Code:", response.status);
        console.log("Response Headers:", response.headers);

        const result = PotService.potResponseSchema.safeParse(json);
        if (!result.success) {
            // console.log('Validation failed: ', json);

            return {
                success: false,
                data: {
                    id: 0,
                    name: '',
                    goalAmount: 0,
                    currentAmount: 0,
                    userId: 0
                },
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
}