import { ThreeCircles } from "react-loader-spinner";

function NotFound() {
  return (
    <div>
      <div className="loading-container">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#f26d21"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <h1>Loading data...</h1>
      </div>
    </div>
  );
}

export default NotFound;
