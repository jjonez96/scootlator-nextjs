import Head from "next/head";
import { useRef, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import useOperators from "../hooks/useOperators";
import LoadingScreen from "./components/LoadingScreen";
import CalculationResults from "./components/CalculationResults";
import Forms from "./components/Forms";
import TierMarkers from "./components/TierMarkers";
import VoiMarkers from "./components/VoiMarkers";
import mapstyle from "../styles/mapstyle.json";
import clusterStyles from "../styles/clusterIcons.json";
import markerIcons from "../styles/markerIcons.json";

import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from "@react-google-maps/api";

export default function Home() {
  /** States */
  const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [directionResponse, setDirectionResponse] = useState();
  const [distance, setDistance] = useState("");
  const [onOffMarkers, setOnOffMarkers] = useState(true);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [libraries] = useState(["places"]);
  const [selected, setSelected] = useState();

  /** Refs */
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();
  const selectInputRef = useRef();
  const mapRef = useRef();

  /** User gps coordinates */
  const location = useGeoLocation();
  const center = location.coordinates;
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  /** Operator selector */
  const operator = useOperators();
  const rentalStartPrice = operator.map((e) => e.startPrice);
  const startPrice = parseInt(rentalStartPrice);

  const calculateRoute = async () => {
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.BICYCLING,
    });

    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    /** If its night then pricing will be increased */
    const hours = new Date().getHours();
    const isDayTime = hours >= 6 && hours < 22;
    if (isDayTime === true) {
      setPrice(
        startPrice +
          parseInt(results.routes[0].legs[0].duration.text) * selected +
          " €"
      );
    } else {
      setPrice(
        startPrice +
          0.44 +
          parseInt(results.routes[0].legs[0].duration.text) * selected +
          " €",
        setDuration(
          2 + parseInt(results.routes[0].legs[0].duration.text) + " min"
        )
      );
    }
  };

  /**Click handler for changing coordinates to address on map*/
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
  const handleDestinationMapClick = (ev) => {
    const url = `${geocodeJson}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }&latlng=${ev.latLng.lat()}, ${ev.latLng.lng()}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        destinationRef.current.value = `${place.formatted_address}`;
      });
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setPrice("");
    map.panTo(center);
    map.setZoom(12 - 6);
    setSelected(0);
    selectInputRef.current.value = "";
    destinationRef.current.value = "";
    originRef.current.value = "";
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  /** Scoot markers on/off switch */
  const handleScootMarkers = (event) => {
    setOnOffMarkers((current) => !current);
  };

  if (!isLoaded) {
    return <LoadingScreen />;
  }
  /** Removes unwanted elements from body */
  document
    .querySelectorAll(".pac-container")
    .forEach((element) => element.remove());

  return (
    <main id="top">
      <Head>
        <title>Scootlator</title>
      </Head>
      <div>
        <Forms
          setSelected={setSelected}
          originRef={originRef}
          destinationRef={destinationRef}
          map={map}
          clearRoute={clearRoute}
          center={center}
          selectInputRef={selectInputRef}
          calculateRoute={calculateRoute}
          handleScootMarkers={handleScootMarkers}
          onOffMarkers={onOffMarkers}
          defaultBounds={defaultBounds}
        />
        <CalculationResults
          duration={duration}
          price={price}
          distance={distance}
        />
        <GoogleMap
          center={center}
          zoom={12 - 6}
          ref={mapRef}
          onClick={(ev) => {
            handleDestinationMapClick(ev);
          }}
          mapContainerClassName="map-container"
          options={{
            minZoom: 6 - 1,
            maxZoom: 6 + 14,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            rotateControlOptions: true,
            rotateControl: true,
            styles: mapstyle,
            clickableIcons: false,
            fullscreenControl: false,
            disableDefaultUI: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          {onOffMarkers === false ? (
            <div style={{ display: "none" }}></div>
          ) : (
            <div className="hideload">
              <TierMarkers
                originRef={originRef}
                destinationRef={destinationRef}
                geocodeJson={geocodeJson}
              />
              <VoiMarkers
                originRef={originRef}
                destinationRef={destinationRef}
                geocodeJson={geocodeJson}
              />
            </div>
          )}
          <Marker position={center} icon={markerIcons[0]} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </GoogleMap>
      </div>
    </main>
  );
}
