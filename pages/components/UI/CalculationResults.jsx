import { RiPinDistanceFill, RiPriceTag3Fill, RiTimeFill } from "react-icons/ri";
import Alert from "react-bootstrap/Alert";
import "animate.css";
const CalculationResults = ({ price, distance, duration }) => {
  const float = parseFloat(price);
  const int = parseInt(distance);
  const toFixedPrice = float.toFixed(2);

  if (int > 20) {
    return (
      <Alert
        className="resultsContainer container fixed-bottom d-flex justify-content-center"
        variant="danger"
      >
        Matkasi on liian pitkä.
      </Alert>
    );
  }

  return (
    <>
      {price === "" ? (
        <div></div>
      ) : (
        <div className="resultsContainer bg-dark text-light container-fluid fixed-bottom d-flex justify-content-around shadow animate__animated animate__fadeInUp">
          <div className="m-1">
            Pituus <RiPinDistanceFill color="#0dcaf0" />
            <br />
            {distance}
          </div>
          <div className="m-1">
            Kesto <RiTimeFill color="#0dcaf0" />
            <br />~{duration}
          </div>
          {price === "1 €" || price === "1.44 €" || price === "NaN €" ? (
            <Alert className="priceAlert p-1 mt-2" variant="danger">
              Hintaa ei valittu.
            </Alert>
          ) : (
            <div className="m-1 d-flex justify-content-around ">
              <div>
                Hinta <RiPriceTag3Fill color="#0dcaf0" />
                <br />~{toFixedPrice} €
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CalculationResults;
