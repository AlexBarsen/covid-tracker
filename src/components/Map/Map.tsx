import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../Utils/Utils";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

interface Props {
  center: any;
  zoom: any;
  mapCountries: undefined | any;
  casesType: string;
}

const Map: React.FC<Props> = ({ center, zoom, mapCountries, casesType }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          {showDataOnMap(mapCountries, casesType)}
        </>
      </MapContainer>
    </div>
  );
};

export default Map;
