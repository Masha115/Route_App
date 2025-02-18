import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

const customIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%;"></div>`,
  });

interface StopMarkersProps {
  stops: any[];
  costs: any[];
  selectedStop: number | null;
  setSelectedStop: (id: number | null) => void;
  getStopColor: (stopId: number) => string;
  costFilter: number;
}

const StopMarkers: React.FC<StopMarkersProps> = ({
  stops,
  costs,
  selectedStop,
  setSelectedStop,
  getStopColor,
  costFilter,
}) => {
  return (
    <>
      {stops.map((stop, index) => {
        const lat = parseFloat(stop.latitude);
        const lng = parseFloat(stop.longitude);
        if (isNaN(lat) || isNaN(lng)) return null;

        const costData = costs.find(
          (c) =>
            c.site_id_from === selectedStop && c.site_id_to === stop.site_id
        );

        if (costData && costData.cost > costFilter) return null;

        return (
          <Marker
            key={index}
            position={[lat, lng]}
            eventHandlers={{ click: () => setSelectedStop(stop.site_id) }}
            icon={customIcon(getStopColor(stop.site_id))}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              permanent={false}
            >
              <strong>{stop.site_name}</strong> (ID: {stop.site_id})
            </Tooltip>
            <Popup>
              <strong>{stop.site_name}</strong> (ID: {stop.site_id})
              {selectedStop === stop.site_id ? (
                <p>Выбрана</p>
              ) : costData ? (
                <>
                  <p>Затраты: {costData.cost} мин.</p>
                  <p>Ожидание: {costData.iwait} мин.</p>
                  <p>Время в салоне: {costData.inveht} мин.</p>
                  <p>Пересадки: {costData.xnum}</p>
                  <p>Штраф: {costData.xpen} мин.</p>
                </>
              ) : (
                <p>Нет данных о маршруте</p>
              )}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default StopMarkers;
