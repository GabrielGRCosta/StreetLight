import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/entities/",
    timeout: 15000,
});

interface RequisitionProps {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint:  string,
    data?: any,
    headers?: AxiosHeaders,
}

const useSendRequisition = () => {

    async function sendRequisition({ method, endpoint, data, headers}: RequisitionProps): Promise<AxiosResponse | null> {

        var response: AxiosResponse | null = null;

        const config:AxiosRequestConfig  = {
            headers: headers
        }

        try {
            switch (method) {
                case "GET":
                    response = await api.get(endpoint, data);
                    break;
                case "POST":
                    response = await api.post(endpoint, data, config);
                    break;
                case "PUT":
                    response = await api.put(endpoint, data, config);
                    break;
                case "PATCH":
                    response = await api.patch(endpoint, data, config);
                    break;
                case "DELETE":
                    response = await api.delete(endpoint, data);
                    break;
                default:
                    
                    break;
            }
    
        } catch (e) {
            console.error(e);
            throw e;
        }

        return response;
    }
            
    return {
        sendRequisition,
    }
};

export default useSendRequisition;