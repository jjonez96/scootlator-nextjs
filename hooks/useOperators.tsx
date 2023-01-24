import { useEffect, useState } from "react";

interface Operator {
  name: string;
  pricePerMin: number;
  startPrice: number;
}

const useOperators = () => {
  const [tierPrice, setTierPrice] = useState<any>([]);

  /*Tier pricePerMin api from node server*/
  useEffect(() => {
    fetch("https://scootdata.cyclic.app/api/tier/pricing")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((tierPrice: object) => {
          setTierPrice(tierPrice);
        });
      })
      .catch((err: boolean) => {
        console.log(err);
      });
  }, []);

  const voi: Operator = {
    name: "Voi",
    pricePerMin: 0.22,
    startPrice: 1,
  };

  const tier: Operator = {
    name: "Tier",
    pricePerMin: tierPrice.rentalRunningPricePerMinute,
    startPrice: tierPrice.rentalStartPrice,
  };

  let operators = [];
  operators.push(tier, voi);

  return operators;
};

export default useOperators;
