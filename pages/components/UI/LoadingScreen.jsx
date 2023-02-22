import { MdElectricScooter } from "react-icons/md";

const LoadingScreen = () => {
  return (
    <div className="loadingBg">
      <p className="loadingScreen text-center">
        <MdElectricScooter size={120} color="#0dcaf0" />
      </p>
    </div>
  );
};

export default LoadingScreen;
