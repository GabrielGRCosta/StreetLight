import { useState, createContext } from 'react';
import { LightPole } from '../@types/entities';

export const MainContext = createContext<MainContextProps>({
    lightPoles: [],
    setLightPoles: () => {}
});

interface MainContextProps{
    lightPoles: Array<LightPole>,
    setLightPoles: React.Dispatch<React.SetStateAction<Array<LightPole>>>,
}

interface MainContextProviderProps {
    children: React.ReactNode
}

function MainContextProvider({children}: MainContextProviderProps) {

    const [lightPoles, setLightPoles] = useState<Array<LightPole>>([]);

    const values = {
        lightPoles,
        setLightPoles,
    }

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;