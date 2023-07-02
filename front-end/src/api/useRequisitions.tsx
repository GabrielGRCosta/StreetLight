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

    async function removeLightPole(): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'POST',
            endpoint: "",
            
        })

        if (!response) throw "Null response";
        
        return response;
    }

    async function powerOffLightPole(): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'POST',
            endpoint: "",
            
        })

        if (!response) throw "Null response";
        
        return response;
    }

    async function powerOnLightPole(): Promise<AxiosResponse> {
        const response = await sendRequisition({
            method: 'POST',
            endpoint: "",
            
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