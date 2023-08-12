import { FaTimes } from "react-icons/fa";
import { Modal } from "react-bootstrap";

const InfoModal = ({ showModal, handleModalToggle }) => {
  return (
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
        <FaTimes onClick={handleModalToggle} style={{ cursor: "pointer" }} />
      </Modal.Header>
      <Modal.Body>
        <p>
          Tällä sovelluksella voit laskea skuuttimatkasi hinnan haluamastasi
          sijainnista minne vain antamalla määränpään osoitteen tai klikkaamalla
          karttaa.
        </p>
        <p>
          Voit hakea sijaintisi painamalla sinistä paikannus ikonia. Muista vain
          hyväksyä sijaintitiedot. Voit määrittää lähtöpisteen myös skuuttista,
          josta löytyy sama paikannus ikoni.
        </p>
        <p>
          Valitse hinta kohdasta voit valita hinnan. Tierin hinta vaihtelee
          automaattisesti riippuen paikkakunnasta. Jos valitset Muu hinta voit
          määrittää minuuttihinnan manuaalisesti.
        </p>
        <p>
          Ratas napista voit halutessasi laittaa skuutit pois kartalta. Punainen
          reset nappi tyhjää kentät kun sitä painaa kerran. Tuplaklikkaamalla
          resetoi koko äpin.
        </p>
        <p>
          <strong>Huom!</strong> Tällä et voi laskea matkoja Helsingistä
          Ivaloon. Matkan pituus voi olla max 20km.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;
