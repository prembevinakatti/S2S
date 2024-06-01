import React from "react";
import Card from "../../components/CardComp/Card";

const HomePage = () => {
  return (
    <div className="w-full h-screen overflow-auto">
      <div className="statusSection w-fit h-fit p-3 m-3 flex items-center justify-center gap-3">
        <button className="btn btn-primary btn-wide">Delivered</button>
        <button className="btn btn-primary btn-wide">Pending</button>
      </div>
      <div className="CardBox w-full flex flex-wrap items-center justify-center gap-10 p-3">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
