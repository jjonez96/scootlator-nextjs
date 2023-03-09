import { Form, Dropdown } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import TierMarkers from "../../mapMarkers/TierMarkers";
import VoiMarkers from "../../mapMarkers/VoiMarkers";
const Settings = ({ onOffMarkers, handleScootMarkers }) => {
  return (
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
      </Dropdown.Menu>
      {onOffMarkers === true ? (
        <div>
          <VoiMarkers />
          <TierMarkers />
        </div>
      ) : null}
    </Dropdown>
  );
};

export default Settings;
