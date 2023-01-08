import { useEffect, useState } from "react";

const useScootApis = () => {
  const [tierMarkers, setTierMarkers] = useState([]);
  const [voiMarkers, setVoiMarkers] = useState([]);

  /*Scooter data from node server*/
  useEffect(() => {
    Promise.all([
      fetch("https://scootdata.cyclic.app/api/tier"),
      fetch("https://scootdata.cyclic.app/api/voi"),
    ])
      .then(([resTier, restVoi]) =>
        Promise.all([resTier.json(), restVoi.json()])
      )
      .then(([dataTier, dataVoi]) => {
        setTierMarkers(dataTier);
        setVoiMarkers(dataVoi);
      });
  }, []);

  const totalMarkers = voiMarkers.length + tierMarkers.length;

  return totalMarkers;
};

export default useScootApis;
