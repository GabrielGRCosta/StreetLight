import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import useRequisitions from './api/useRequisitions';
import { Coordinates } from './@types/entities';

type Action = "NEW" | "DELETE" | "TOGGLE"

function App() {

  const { createLightPole } = useRequisitions();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [animationBtDrawer, setAnimationBtDrawer] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [action, setAction] = useState<Action | null>(null);

  // useEffect(() => {
  //   if (openDrawer)
  //     setAnimationBtDrawer(15)
  //   else
  //     setAnimationBtDrawer(0)
  // }, [openDrawer])

  useEffect(() => {
    if (coordinates)
      switch (action) {
        case 'NEW':
          createLightPole({
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
        break;
        
      }
    setAction(null);
  }, [coordinates])

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
