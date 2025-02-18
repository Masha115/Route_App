import { useMapEvents } from "react-leaflet";

interface MapEventsHandlerProps {
  setSelectedStop: (id: number | null) => void;
}

const MapEventsHandler: React.FC<MapEventsHandlerProps> = ({
  setSelectedStop,
}) => {
  useMapEvents({
    click: () => setSelectedStop(null),
    zoomend: (event) => console.log("Текущий масштаб:", event.target.getZoom()),
  });
  return null;
};

export default MapEventsHandler;
