import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { scaleThreshold } from "d3-scale";
import StopMarkers from "./StopMarker";
import CostFilter from "./CostFilter";
import MapEventsHandler from "./MapEventsHandler";
import { loadCSVData } from "../services/csvService";

const costColorScale = scaleThreshold<number, string>()
  .domain([5, 15, 30])
  .range(["green", "yellow", "red", "purple", "black"]);

const MapComponent: React.FC = () => {
  const [stops, setStops] = useState<any[]>([]);
  const [costs, setCosts] = useState<any[]>([]);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [costFilter, setCostFilter] = useState<number>(30);

  useEffect(() => {
    const fetchStops = async () => {
      const response = await fetch("/data/sites.csv");
      const text = await response.text();
      const parsedData = await loadCSVData(new File([text], "sites.csv"));
      setStops(parsedData);
    };

    const fetchCosts = async () => {
      const response = await fetch("/data/costs.csv");
      const text = await response.text();
      const parsedData = await loadCSVData(new File([text], "costs.csv"));
      setCosts(parsedData);
    };

    fetchStops();
    fetchCosts();
  }, []);

  const getStopColor = (stopId: number) => {
    if (!selectedStop) return "blue";
    const costData = costs.find(
      (c) => c.site_id_from === selectedStop && c.site_id_to === stopId
    );
    return costData && costData.cost <= costFilter
      ? costColorScale(costData.cost)
      : "gray";
  };

  return (
    <>
      <CostFilter costFilter={costFilter} setCostFilter={setCostFilter} />
      <MapContainer
        center={[55.76, 37.62]}
        zoom={12}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventsHandler setSelectedStop={setSelectedStop} />
        <StopMarkers
          stops={stops}
          costs={costs}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
          getStopColor={getStopColor}
          costFilter={costFilter}
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;
