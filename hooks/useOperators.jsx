import useSWR from "swr";

const useOperators = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(
    "https://scootdata.cyclic.app/api/tier/pricing",
    fetcher
  );

  const services = [
    {
      name: "Tier",
      pricePerMin: data?.rentalRunningPricePerMinute || 0.26,
      startPrice: data?.rentalStartPrice || 1.0,
    },
    {
      name: "Voi",
      pricePerMin: 0.22,
      startPrice: 1,
    },
  ];

  return services;
};

export default useOperators;
