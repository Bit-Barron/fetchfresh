import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MarketMapProps {
  latitude: string;
  longitude: string;
  name: string;
}

const MarketMap = ({ latitude, longitude, name }: MarketMapProps) => {
  const position = [parseFloat(latitude), parseFloat(longitude)];

  // SVG icon
  const svgIcon = L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="#FF0000" d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.88 12 24 12 24S20.5 14.88 20.5 8.5C20.5 3.81 16.69 0 12 0ZM12 12C10.07 12 8.5 10.43 8.5 8.5C8.5 6.57 10.07 5 12 5C13.93 5 15.5 6.57 15.5 8.5C15.5 10.43 13.93 12 12 12Z"/>
      </svg>
    `,
    className: "svg-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <MapContainer
      center={position as [number, number]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position as [number, number]} icon={svgIcon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MarketMap;
