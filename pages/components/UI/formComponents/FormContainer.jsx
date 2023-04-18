import { Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import OriginAndDestination from "./OriginAndDestination";
import PriceSelector from "./PriceSelector";
import Settings from "./Settings";
const FormContainer = ({
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
  handleDoubleClickClear,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <main>
      <div className="formContainer fixed-top shadow p-1 container-fluid ">
        <h6 className="text-center text-info">Laske skuutti matka</h6>
        <Form className="hstack gap-1 row" onSubmit={handleFormSubmit}>
          <OriginAndDestination
            originRef={originRef}
            destinationRef={destinationRef}
            map={map}
            geocodeJson={geocodeJson}
          />
          <Form.Group className="d-flex justify-content-center was-validated adjust">
            <Settings
              onOffMarkers={onOffMarkers}
              handleScootMarkers={handleScootMarkers}
              handleNumberInput={handleNumberInput}
              otherPrice={otherPrice}
            />
            <PriceSelector
              selectInputRef={selectInputRef}
              setSelected={setSelected}
              selected={selected}
              otherPrice={otherPrice}
            />
            <Button
              className="mx-2 fw-bold text-dark "
              variant="danger"
              aria-label="danger"
              onClick={clearRoute}
              onDoubleClick={handleDoubleClickClear}
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
export default FormContainer;
