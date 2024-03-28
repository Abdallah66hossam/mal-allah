import "./loading.css";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-white">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
