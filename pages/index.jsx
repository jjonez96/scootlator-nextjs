import Head from "next/head";
import { useRef, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import LoadingScreen from "./components/UI/LoadingScreen";
import CalculationResults from "./components/UI/CalculationResults";
import FormContainer from "./components/UI/formComponents/FormContainer";
import TierMarkers from "./components/mapMarkers/TierMarkers";
import mapstyle from "../styles/mapstyle.json";
import clusterStyles from "../styles/clusterIcons.json";
import markerIcons from "../styles/markerIcons.json";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerClusterer,
  MarkerF,
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
  const [selected, setSelected] = useState(0);
  const [otherPrice, setOtherPrice] = useState(false);

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

    /** in night time pricing and duration will be increased */
    const hours = new Date().getHours();
    const isDayTime = hours >= 6 && hours < 22;
    if (isDayTime === true) {
      setPrice(
        1 + parseInt(results.routes[0].legs[0].duration.text) * selected + " €"
      );
    } else {
      setPrice(
        1 +
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

  /** Clearing functions for red button */
  const clearRoute = () => {
    destinationRef.current.value = "";
    originRef.current.value = "";
    setOtherPrice(false);
    setSelected(0);
    setPrice("");
    setDistance("");
    setDuration("");
    map.panTo(center);
    map.setZoom(12);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  /** Settings on/off switch */
  const handleScootMarkers = () => {
    setOnOffMarkers((current) => !current);
  };
  const handleNumberInput = () => {
    setOtherPrice((current) => !current);
    setSelected(0.2);
  };

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  /** Removes unnessescary elements from body */
  document
    .querySelectorAll(".pac-container")
    .forEach((element) => element.remove());

  return (
    <main id="top">
      <Head>
        <title>Scootlator</title>
      </Head>
      <GoogleMap
        center={center}
        zoom={12}
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
          gestureHandling: "greedy",
          clickableIcons: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
        onLoad={(map) => setMap(map)}
      >
        {onOffMarkers === false ? null : (
          <MarkerClusterer
            options={{
              styles: clusterStyles,
              gridSize: 60,
              maxZoom: 17,
            }}
          >
            {(clusterer) => (
              <div className="hideload">
                <TierMarkers
                  originRef={originRef}
                  destinationRef={destinationRef}
                  geocodeJson={geocodeJson}
                  clusterer={clusterer}
                />
              </div>
            )}
          </MarkerClusterer>
        )}
        <MarkerF position={center} icon={markerIcons[0]} />
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
      <FormContainer
        setSelected={setSelected}
        selected={selected}
        handleNumberInput={handleNumberInput}
        otherPrice={otherPrice}
        setOtherPrice={setOtherPrice}
        originRef={originRef}
        destinationRef={destinationRef}
        map={map}
        clearRoute={clearRoute}
        selectInputRef={selectInputRef}
        calculateRoute={calculateRoute}
        handleScootMarkers={handleScootMarkers}
        onOffMarkers={onOffMarkers}
        geocodeJson={geocodeJson}
      />
      <CalculationResults
        duration={duration}
        price={price}
        distance={distance}
      />
    </main>
  );
}
