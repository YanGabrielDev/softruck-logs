import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from "react-leaflet";
import L, { Map as LeafletMap, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./map-component.module.scss";
import type { GPSPoint } from "../../types";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "leaflet/dist/images/marker-icon.png",
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
});

interface MapComponentProps {
  trajectory: GPSPoint[];
  currentCarPosition: GPSPoint | null;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  trajectory,
  currentCarPosition,
}) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const MapUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = map;
      }

      if (center) {
        map.setView(center, map.getZoom() || 13, {
          animate: true,
          duration: 0.5,
        });
      }
    }, [center, map]);
    return null;
  };

  const path: LatLngExpression[] = trajectory.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  const initialCenter: LatLngExpression =
    trajectory.length > 0
      ? [trajectory[0].latitude, trajectory[0].longitude]
      : [-23.963214, -46.28054];

  const carIcon = L.icon({
    iconUrl: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
    iconSize: [100, 66],
    iconAnchor: [30, 30],
  });
  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      className={styles.mapContainer}
      preferCanvas={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {trajectory.length > 0 && (
        <Polyline
          positions={path}
          color="#0652bd"
          weight={5}
          className={styles.trajectoryLine}
        />
      )}

      {currentCarPosition && (
        <>
          <Marker
            position={[
              currentCarPosition.latitude,
              currentCarPosition.longitude,
            ]}
            icon={carIcon}
            zIndexOffset={1000}
          />
          <MapUpdater
            center={[currentCarPosition.latitude, currentCarPosition.longitude]}
          />
        </>
      )}
    </MapContainer>
  );
};
