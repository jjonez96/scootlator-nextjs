import { Button, Form, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import OriginAndDestination from "./OriginAndDestination";
import PriceSelector from "./PriceSelector";
import Settings from "./Settings";
import { useState } from "react";
import InfoModal from "./InfoModal";

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
  setOtherPrice,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    return false;
  };
  const [showModal, setShowModal] = useState(true);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <main>
      <div className="formContainer fixed-top shadow p-1 container-fluid ">
        <h6 className="text-center text-info">Laske skuutti matka</h6>
        <BsInfoCircle
          style={{ cursor: "pointer" }}
          className="info"
          onClick={handleModalToggle}
        />
        <InfoModal
          handleModalToggle={handleModalToggle}
          showModal={showModal}
        />
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
            />
            <PriceSelector
              selectInputRef={selectInputRef}
              setSelected={setSelected}
              selected={selected}
              otherPrice={otherPrice}
              handleNumberInput={handleNumberInput}
              setOtherPrice={setOtherPrice}
            />
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
export default FormContainer;
