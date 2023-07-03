import { AxiosResponse } from "axios";
import { LightPole } from "../@types/entities";
import useSendRequisition from "./useSendRequisition";

const useRequisitions = () => {

    const { sendRequisition } = useSendRequisition();

    async function getAllLightPole(): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'GET',
            endpoint: "",
        })

        if (!response) throw "Null response";
        
        return response;
    }

    async function createLightPole(newLP: LightPole): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'POST',
            endpoint: "",
            data: newLP
        })

        if (!response) throw "Null response";
        
        return response;
    }

    async function removeLightPole(id: string): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'DELETE',
            endpoint: id,
        })

        if (!response) throw "Null response";
        
        return response;
    }

    async function powerOffLightPole(id: string): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'PATCH',
            endpoint: id,
            data: {
                "status": {
                    "type": "Boolean",
                    "value": "off"
                }  
            }
        })

        if (!response) throw "Null response";
        
        return response;
    }

    async function powerOnLightPole(id: string): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'PATCH',
            endpoint: id,
            data: {
                "status": {
                    "type": "Boolean",
                    "value": "on"
                }
            }
        })

        if (!response) throw "Null response";
        
        return response;
    }

    return {
        getAllLightPole,
        createLightPole,
        removeLightPole,
        powerOffLightPole,
        powerOnLightPole,
    }
};

export default useRequisitions;