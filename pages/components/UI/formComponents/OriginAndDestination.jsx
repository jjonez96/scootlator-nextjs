import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { MdClose, MdMyLocation } from "react-icons/md";
import useGeoLocation from "../../../../hooks/useGeoLocation";

const OriginAndDestination = ({
  originRef,
  destinationRef,
  map,
  geocodeJson,
}) => {
  const autocompleteRef = useRef();

  const location = useGeoLocation();
  const center = location.coordinates;

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const settings = {
    componentRestrictions: { country: "fi" },
    fields: ["place_id", "geometry", "formatted_address", "name"],
    bounds: defaultBounds,
    strictBounds: false,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const autocomplete = window.google.maps;
      autocompleteRef.current = new autocomplete.places.Autocomplete(
        destinationRef.current,
        settings,
        (autocompleteRef.current = new autocomplete.places.Autocomplete(
          originRef.current,
          settings
        ))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const clearDestination = () => {
    destinationRef.current.value = "";
  };

  /**Click handler for changing coordinates to address*/
  const handleOriginClick = () => {
    const url = `${geocodeJson}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&latlng=${center.lat},${center.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };

  return (
    <>
      <Form.Group className="form-floating was-validated col-auto input-width">
        <Form.Control
          className="input-height bg-dark text-light"
          type="text"
          ref={originRef}
          required
        />
        <Form.Label className="text-light">
          Valitse lähtöpaikka tai skuutti
        </Form.Label>
        <MdMyLocation
          className="icon text-info bg-dark"
          onClick={(e) => {
            map.panTo(center);
            map.setZoom(18);
            handleOriginClick(e);
          }}
        />
      </Form.Group>
      <Form.Group className="was-validated form-floating col-auto container input-width">
        <Form.Control
          className="input-height bg-dark text-light"
          type="text"
          ref={destinationRef}
          required
        />
        <Form.Label className="text-light">
          Valitse määränpää tai klikkaa karttaa
        </Form.Label>
        <MdClose
          className="icon text-info bg-dark icon"
          onClick={(e) => {
            clearDestination(e);
          }}
        />
      </Form.Group>
    </>
  );
};
export default OriginAndDestination;
