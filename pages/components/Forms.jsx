import { useEffect, useRef } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { MdClose, MdMyLocation } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import TierMarkers from "./TierMarkers";
import { FaTimes } from "react-icons/fa";
import VoiMarkers from "./VoiMarkers";
import useOperators from "../../hooks/useOperators";
import useGeoLocation from "../../hooks/useGeoLocation";

const Forms = ({
  originRef,
  destinationRef,
  calculateRoute,
  onOffMarkers,
  handleScootMarkers,
  map,
  selectInputRef,
  geocodeJson,
  setSelected,
  selected,
  clearRoute,
  handleNumberInput,
  otherPrice,
}) => {
  const autocompleteRef = useRef();
  const operators = useOperators();
  const location = useGeoLocation();

  /**Functions for other price */
  const increment = () => {
    setSelected((selected += 0.01));
  };
  const decrement = () => {
    setSelected((selected -= 0.01));
  };

  const float = parseFloat(selected);
  const toFixedPrice = float.toFixed(2);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    return false;
  };

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
    <main>
      <div className="formContainer fixed-top shadow p-1 container-fluid ">
        <h6 className="text-center text-info">Laske skuutti matka</h6>
        <Form className="hstack gap-1 row" onSubmit={handleFormSubmit}>
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
            <Form.Label className="text-light ">
              Valitse määränpää tai klikkaa karttaa
            </Form.Label>
            <MdClose
              className="icon text-info bg-dark icon"
              onClick={(e) => {
                clearDestination(e);
              }}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center was-validated adjust">
            <Dropdown>
              <Dropdown.Toggle className="mx-2 btn btn-info" aria-label="info">
                <FiSettings className="text-dark" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark text-center text-light">
                Scootit kartassa
                <Form.Check
                  type="switch"
                  onChange={handleScootMarkers}
                  value={onOffMarkers}
                  id=""
                  defaultChecked={onOffMarkers}
                />
                <hr className="text-info" />
                Muu hinta
                <Form.Check
                  type="switch"
                  onChange={handleNumberInput}
                  value={otherPrice}
                  id=""
                />
              </Dropdown.Menu>
              {onOffMarkers === true ? (
                <div>
                  <VoiMarkers />
                  <TierMarkers />
                </div>
              ) : null}
            </Dropdown>

            {otherPrice === true ? (
              <Form.Select
                className="form-control text-light bg-dark  priceSelect "
                ref={selectInputRef}
                onChange={(e) => setSelected(e.target.value)}
                required
              >
                {operators.map((service) => (
                  <option
                    key={`${service.pricePerMin},${service.name},${service.startPrice}`}
                    value={service.pricePerMin}
                  >
                    {service.name} {service.pricePerMin}€/min +{" "}
                    {service.startPrice}€ aloitusmaksu
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Group className=" form-floating priceSelect">
                <Form.Control
                  className="input-height bg-dark text-light text-center "
                  value={toFixedPrice}
                  type="text"
                  inputMode="numeric"
                  ref={selectInputRef}
                  step={0.01}
                  onChange={(e) => setSelected(+e.target.value)}
                />
                <Button onClick={increment} className="increment btn btn-dark">
                  + 0.01
                </Button>
                <Button onClick={decrement} className="decrement btn btn-dark">
                  - 0.01
                </Button>
                <Form.Label className="text-light text-center  ">
                  {toFixedPrice}€/min + 1€
                </Form.Label>
              </Form.Group>
            )}
            <Button
              className="mx-2 fw-bold text-dark "
              variant="danger"
              aria-label="danger"
              onClick={clearRoute}
            >
              <FaTimes />
            </Button>
          </Form.Group>

          <Button
            variant="info"
            type="submit"
            aria-label="info"
            className="calculateBtn container p-1 fw-bold"
            onClick={calculateRoute}
          >
            Laske
          </Button>
        </Form>
      </div>
    </main>
  );
};
export default Forms;
