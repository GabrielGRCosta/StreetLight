import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import useRequisitions from './api/useRequisitions';
import { Coordinates } from './@types/entities';
import { MainContext } from './stores/mainContext';

type Action = "NEW" | "DELETE" | "TOGGLE"

interface CoordinatesAndId extends Coordinates {
  id?: string,
  status?: string,
}

function App() {

  const { createLightPole, removeLightPole, powerOffLightPole, powerOnLightPole } = useRequisitions();

  const { lightPoles, setLightPoles } = useContext(MainContext);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [animationBtDrawer, setAnimationBtDrawer] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<CoordinatesAndId | null>(null);
  const [action, setAction] = useState<Action | null>(null);

  useEffect(() => {
    executeAction();
  }, [coordinates])

  async function executeAction() {
    let response;
    if (coordinates)
      switch (action) {
        case 'NEW':
          response = await createLightPole({
            type: "StreetLight",
            location: {
              type: "geo:json",
              value: {
                type: 'Point',
                coordinates: coordinates
              }
            },
            status: {
              type: 'Boolean',
              value: 'on',
            }
          })

          if (response.status >= 200 && response.status < 300) {
            lightPoles.push(response.data);
          }

        break;
        case 'DELETE':
          if (!(coordinates.id)) throw "Null id";
          response = await removeLightPole(coordinates.id)

          if (response.status >= 200 && response.status < 300) {
            let index = lightPoles.findIndex((lp) => lp.id == coordinates.id)
            if (index > -1) lightPoles.splice(index, 1);
          }
        break;
        case 'TOGGLE':
          if (!(coordinates.id) || !(coordinates.status)) throw "Null id or Null status";
            if (coordinates.status == 'off') {
              response = await powerOnLightPole(coordinates.id);

              if (response.status >= 200 && response.status < 300) {
                let index = lightPoles.findIndex((lp) => lp.id == coordinates.id)
                lightPoles[index].status.value = 'on';
              } 
            }
            else if (coordinates.status == 'on') {
              response = await powerOffLightPole(coordinates.id);

              if (response.status >= 200 && response.status < 300) {
                let index = lightPoles.findIndex((lp) => lp.id == coordinates.id)
                lightPoles[index].status.value = 'off';
              }
            }
        break;
      }
    setAction(null);
  }

  return (
    <div className="App">

      <Drawer
        open={openDrawer}
        direction='left'
        zIndex={400}
        className='drawer'
        style={{
          backgroundColor: "#020b1c",
          width: '15%',
        }}>
        <div className='drawer-content'>
          <button className='button-action-drawer' onClick={() => {setOpenDrawer(false); setAction('NEW')}}>
            Adicionar poste
            <span className="material-symbols-outlined icon-action-drawer">
              add
            </span>
          </button>
          <button className='button-action-drawer' onClick={() => {setOpenDrawer(false); setAction('DELETE')}}>
            Remover poste
            <span className="material-symbols-outlined icon-action-drawer">
              delete
            </span>
          </button>
          <button className='button-action-drawer' onClick={() => {setOpenDrawer(false); setAction('TOGGLE')}}>
            Ligar/Desligar poste
            <span className="material-symbols-outlined icon-action-drawer">
              highlight
            </span>
          </button>
        </div>
      </Drawer>
      <Map
         selectionMode={action != null}
         setCoordinates={setCoordinates}
        />
      {!action && <button 
        onClick={() => setOpenDrawer(!openDrawer)} 
        className='button-open-drawer'
        style={{transform: `translate(${animationBtDrawer}px, 0px)`}} >
        <span className="material-symbols-outlined drawer-icon" style={{rotate: openDrawer ? '180deg' : '0deg'}}>
          chevron_right
        </span>
      </button>}
      {action && <div className='exclamer-selection-mode'>
        Selecione um {action == 'NEW' ? "local" : "poste"} no mapa para realizar a ação
      </div>}
    </div>
  );
}

export default App;
