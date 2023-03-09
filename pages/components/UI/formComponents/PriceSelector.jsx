import { Button, Form } from "react-bootstrap";
import useOperators from "../../../../hooks/useOperators";

const PriceSelector = ({
  selectInputRef,
  setSelected,
  selected,
  otherPrice,
  handleNumberInput,
  setOtherPrice,
}) => {
  const operators = useOperators();

  /**Functions for other price */
  const increment = () => {
    setSelected((selected += 0.01));
  };
  const decrement = () => {
    setSelected((selected -= 0.01));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === "asd") {
      setOtherPrice(true);
      setSelected(0.2);
    } else {
      setOtherPrice(false);
    }
  };

  const float = isNaN(selected) ? 0.2 : parseFloat(selected);
  const toFixedPrice = float.toFixed(2);

  return (
    <>
      <input
        type="checkbox"
        onChange={handleNumberInput}
        checked={otherPrice}
        value={selected}
        hidden={true}
      />
      {otherPrice === false ? (
        <Form.Select
          className="form-control text-light bg-dark  priceSelect "
          ref={selectInputRef}
          onChange={handleSelectChange}
          value={selected}
          required
        >
          <option value="" defaultValue={0} disabled={false}>
            Valitse hinta
          </option>
          {operators.map((service) => (
            <option
              key={`${service.pricePerMin},${service.name},${service.startPrice}`}
              value={service.pricePerMin}
            >
              {service.name} {service.pricePerMin}€/min + {service.startPrice}€
              aloitusmaksu
            </option>
          ))}
          <option value="asd">muu</option>
        </Form.Select>
      ) : (
        <Form.Group className="form-floating priceSelect">
          <Form.Control
            className="input-height bg-dark text-light text-center "
            value={toFixedPrice}
            type="text"
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
          <Form.Label className="text-light text-center mx-1">
            {toFixedPrice}€/min + 1€
          </Form.Label>
        </Form.Group>
      )}
    </>
  );
};

export default PriceSelector;
