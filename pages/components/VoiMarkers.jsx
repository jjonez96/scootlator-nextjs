import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import { IoBatteryCharging } from "react-icons/io5";
import markerIcons from "../../styles/markerIcons.json";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import useScootData from "../../hooks/useScootData";

const VoiMarkers = ({ originRef, geocodeJson, clusterer }) => {
  const [selectedMarker, setSelectedMarker] = useState("");
  const total = useScootData();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    "https://scootdata.cyclic.app/api/voi",
    fetcher
  );
  if (error) return <div className="loading">Hups jokin meni pieleen.</div>;

  if (!data)
    return (
      <div className="loading">
        <Spinner
          animation="border"
          variant="info"
          size="sm"
          className="loading"
        />
      </div>
    );

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

  return (
    <>
      <p className="loadingText">Skuutteja löytyi: {total}</p>
      {data.map((marker, id) => (
        <Marker
          icon={markerIcons[1]}
          key={id}
          title={"Voi"}
          clusterer={clusterer}
          position={marker}
          onClick={() => {
            setSelectedMarker(marker);
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker("")}
        >
          <div className="text-center">
            <b className="voiheading">Voi</b>
            <div>
              <b>{selectedMarker.category}</b> {""}
              {selectedMarker.battery > 50 ? (
                <b style={{ color: "#00ff00" }}>
                  {""}
                  <IoBatteryCharging size={20} />
                  <b className="battery"> {selectedMarker.battery}% </b>
                </b>
              ) : selectedMarker.battery > 25 ? (
                <b style={{ color: "#ffee00" }}>
                  <IoBatteryCharging size={20} className="" /> {""}
                  <b className="battery"> {selectedMarker.battery}% </b>
                </b>
              ) : (
                <b style={{ color: "#ff0000" }}>
                  <IoBatteryCharging size={20} /> {""}
                  <b className="battery"> {selectedMarker.battery}% </b>
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
                className="btn btn-outline-info bg-transparent text-info m-1  border-info"
                size="sm"
              >
                <a
                  className="vuokraa text-info"
                  href="https://lqfa.adj.st/voiapp/open?adj_t=3swpnku&adj_campaign=campaign2&adj_adgroup=adgroup2&adj_creative=creative2&adj_deeplink=voiapp%3A%2F%2Fhome"
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

export default VoiMarkers;
