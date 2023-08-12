import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import { IoBatteryCharging } from "react-icons/io5";
import Spinner from "react-bootstrap/Spinner";
import markerIcons from "../../../styles/markerIcons.json";
import useSWR from "swr";

const TierMarkers = ({ originRef, destinationRef, geocodeJson, clusterer }) => {
  const [selectedMarker, setSelectedMarker] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    "https://scootdata.cyclic.app/api/tier",
    fetcher
  );

  if (error)
    return <div className="loading text-info">Hups jokin meni pieleen.</div>;
  if (!data) return <Spinner variant="info" size="sm" className="loading" />;

  /**Click handler for changing coordinates to address(passing address to origin input)*/
  const handleScootLocationClick = () => {
    const url = `${geocodeJson}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&latlng=${selectedMarker.lat},${selectedMarker.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };
  let newTime = new Date(selectedMarker.locationUpdate);
  const minutes = String(newTime.getMinutes()).padStart(2, "0");
  const hours = String(newTime.getHours()).padStart(2, "0");
  const time = hours + ":" + minutes;
  return (
    <>
      {data.map((marker, id) => (
        <Marker
          icon={
            marker.vehicleType === "escooter" ? markerIcons[2] : markerIcons[3]
          }
          key={id}
          title={"Tier"}
          clusterer={clusterer}
          position={marker}
          onClick={() => {
            setSelectedMarker(marker);
            destinationRef.current.value = "";
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker("")}
        >
          <div className="text-center">
            <b className="tierheading">Tier</b>
            <div>
              <b>Päivitetty: {time}</b>
              <br />
              <b> {selectedMarker.vehicleType}</b>
              {selectedMarker.batteryLevel > 50 ? (
                <b style={{ color: "#00ff00" }}>
                  <IoBatteryCharging size={20} />
                  <b className="battery"> {selectedMarker.batteryLevel}% </b>
                </b>
              ) : selectedMarker.batteryLevel > 25 ? (
                <b style={{ color: "#ffee00" }}>
                  <IoBatteryCharging size={20} className="" />
                  <b className="battery"> {selectedMarker.batteryLevel}% </b>
                </b>
              ) : (
                <b style={{ color: "#ff0000" }}>
                  <IoBatteryCharging size={20} />
                  <b className="battery"> {selectedMarker.batteryLevel}% </b>
                </b>
              )}
            </div>
            <div className="markBtns">
              <Button
                onClick={(e) => {
                  handleScootLocationClick(e);
                }}
                className="btn btn-outline-info bg-transparent text-info border-info"
                size="sm"
              >
                <MdMyLocation />
              </Button>
              <Button
                className="btn btn-outline-info bg-transparent text-info m-1 border-info"
                size="sm"
              >
                <a
                  className="vuokraa text-info"
                  href="https://qr.tier-services.io/AB123456"
                >
                  Vuokraa
                </a>
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default TierMarkers;
