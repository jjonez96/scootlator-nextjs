import { useEffect, useState } from "react";
const useOperators = () => {
  const [tierPrice, setTierPrice] = useState([]);
  /*Tier pricePerMin api from node server*/
  useEffect(() => {
    fetch("https://scootdata.cyclic.app/api/tier/pricing")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((tierPrice) => {
          setTierPrice(tierPrice);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const services = [
    {
      name: "Tier",
      pricePerMin: tierPrice.rentalRunningPricePerMinute,
      startPrice: tierPrice.rentalStartPrice,
    },
    {
      name: "Voi",
      pricePerMin: 0.22,
      startPrice: 1,
    },
    {
      pricePerMin: 0.2,
      startPrice: 1,
    },
    {
      pricePerMin: 0.21,
      startPrice: 1,
    },
    {
      pricePerMin: 0.22,
      startPrice: 1,
    },
    {
      pricePerMin: 0.23,
      startPrice: 1,
    },
    {
      pricePerMin: 0.24,
      startPrice: 1,
    },
    {
      pricePerMin: 0.25,
      startPrice: 1,
    },
    {
      pricePerMin: 0.26,
      startPrice: 1,
    },
    {
      pricePerMin: 0.27,
      startPrice: 1,
    },
    {
      pricePerMin: 0.28,
      startPrice: 1,
    },
    {
      pricePerMin: 0.29,
      startPrice: 1,
    },
    {
      pricePerMin: 0.3,
      startPrice: 1,
    },
  ];

  return services;
};

export default useOperators;
