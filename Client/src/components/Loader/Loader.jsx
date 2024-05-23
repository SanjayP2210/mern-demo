import "./Loader.css"; // Make sure to create and style this CSS file
import { TailSpin } from "react-loader-spinner";

const Loader = ({ visible }) => {
  return (
    <TailSpin // Type of spinner
      height="120"
      width="120"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass="spinner-div"
      visible={visible}
    />
  );
};

export default Loader;
