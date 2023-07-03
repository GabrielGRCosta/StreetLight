import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, CircleMarker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../../assets/img/poste_bk.png"
import L from 'leaflet';
import "./style.css";
import { useEffect, useState } from "react";
import useRequisitions from '../../api/useRequisitions'
import { LightPole } from "../../@types/entities";

interface MapProps {
    selectionMode: boolean,
    setCoordinates: Function,
}

export default function Map({selectionMode, setCoordinates}: MapProps) {

    const centerLatitude = -5.832430084556201;
    const centerLongitude = -35.205416846609594;

    const { getAllLightPole } = useRequisitions();
    
    const [lightPoles, setLightPoles] = useState<Array<LightPole>>([]);

    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 35],
        iconAnchor: [5, 30]
    });

    useEffect(() => {
        loadLightPole();
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
                        icon={customIcon} 
                        position={[latitude, longitude]}
                        eventHandlers={{
                            click: (e) => {
                                if (selectionMode) setCoordinates({
                                    id: lP.id,
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