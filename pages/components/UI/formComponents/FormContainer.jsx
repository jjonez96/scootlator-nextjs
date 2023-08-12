import { Button, Form, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import OriginAndDestination from "./OriginAndDestination";
import PriceSelector from "./PriceSelector";
import Settings from "./Settings";
import { useState } from "react";

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
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="dark-modal"
          show={showModal}
          onHide={handleModalToggle}
        >
          <Modal.Header>
            <Modal.Title>Scootlator</Modal.Title>
            <FaTimes
              onClick={handleModalToggle}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>
          <Modal.Body>
            <p>
              Tällä sovelluksella voit laskea skuuttimatkasi hinnan haluamastasi
              sijainnista minne vain antamalla määränpään osoitteen tai
              klikkaamalla karttaa.
            </p>
            <p>
              Voit hakea sijaintisi painamalla sinistä paikannus ikonia. Muista
              vain hyväksyä sijaintitiedot. Voit määrittää lähtöpisteen myös
              skuuttista, josta löytyy sama paikannus ikoni.
            </p>
            <p>
              Valitse hinta kohdasta voit valita hinnan. Tierin hinta vaihtelee
              automaattisesti riippuen paikkakunnasta. Jos valitset Muu hinta
              voit määrittää minuuttihinnan manuaalisesti.
            </p>
            <p>
              Ratas napista voit halutessasi laittaa skuutit pois kartalta.
              Punainen reset nappi tyhjää kentät kun sitä painaa kerran.
              Tuplaklikkaamalla resetoi koko äpin.
            </p>
            <p>
              <strong>Huom!</strong> Tällä et voi laskea matkoja Helsingistä
              Ivaloon. Matkan pituus voi olla max 20km.
            </p>
          </Modal.Body>
        </Modal>
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
