import axios from "axios";

export const axiosFetch = async (url: string, options: any) => {
    try {
        const { method = 'GET', headers = {}, body = null } = options;

        const config = {
            method,
            url: url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}` : url,
            headers,
            data: body,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};