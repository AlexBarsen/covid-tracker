import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../App";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

interface Props {
  center: any;
  zoom: any;
  mapCountries: undefined | any;
}

const Map: React.FC<Props> = ({ center, zoom, mapCountries }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          {showDataOnMap(mapCountries, "cases")}
        </>
      </MapContainer>
    </div>
  );
};

export default Map;
