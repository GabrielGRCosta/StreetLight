import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, CircleMarker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconLight from "../../assets/img/poste_light.png"
import iconOff from "../../assets/img/poste_off.png"
import L from 'leaflet';
import "./style.css";
import { useContext, useEffect, useState } from "react";
import useRequisitions from '../../api/useRequisitions'
import { LightPole } from "../../@types/entities";
import { MainContext } from "../../stores/mainContext";

interface MapProps {
    selectionMode: boolean,
    setCoordinates: Function,
}

export default function Map({selectionMode, setCoordinates}: MapProps) {

    const centerLatitude = -5.832430084556201;
    const centerLongitude = -35.205416846609594;

    const { getAllLightPole } = useRequisitions();
    
    const { lightPoles, setLightPoles } = useContext(MainContext);

    const customIconLight = new L.Icon({
        iconUrl: iconLight,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        className: 'icon-marker',
    });

    const customIconOff = new L.Icon({
        iconUrl: iconOff,
        iconSize: [40,40],
        iconAnchor: [20, 20],
    })

    useEffect(() => {
        loadLightPole();
        const idInterval = setInterval(() => loadLightPole(), 15000)
        return () => clearInterval(idInterval);
    }, [])

    function MapView() {
        let map = useMap();
        map.setView([centerLatitude, centerLongitude], map.getZoom());
        return null;
    }

    const MapEvents = () => {
        useMapEvents({
          click(e) {
            if (selectionMode)
                setCoordinates({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                })
          },

        });
        return <></>;
    }

    async function loadLightPole() {
        const response = await getAllLightPole()

        if (response.status >= 200 && response.status < 300) {
            setLightPoles(response.data);
        }
    }

    return (
        <MapContainer
            className="map"
            center={[centerLatitude, centerLongitude]}
            zoom={12}
            scrollWheelZoom={true}
            zoomControl={false}
            
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
                contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {lightPoles.map((lP, index) => {
                const {latitude, longitude} = lP.location.value.coordinates
                return (
                    <Marker 
                        
                        key={index} 
                        icon={lP.status.value == 'on' ? customIconLight : customIconOff} 
                        position={[latitude, longitude]}
                        eventHandlers={{
                            click: (e) => {
                                if (selectionMode) setCoordinates({
                                    id: lP.id,
                                    status: lP.status.value,
                                    latitude: e.latlng.lat,
                                    longitude: e.latlng.lng,
                                })
                            }
                        }}>
                    </Marker>
                )
            })}
            <MapEvents />
        </MapContainer>
    );
}