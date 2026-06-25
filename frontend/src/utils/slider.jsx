import { useState } from 'react';

const SliderPanel = ({ activeNumber, total }) => {
  const width = 100 / total;

  return (
    <div className="relative w-full">   
      <div
        className="absolute bottom-0 left-0 transition ease-in-out duration-500 w-full"
        style={{transform: `translateX(${activeNumber * width}%)` }}
      >
        <div className="bg-white h-1 rounded-lg ml-[5%]" style={{ width: `${width-10}%`}}></div>
      </div>
    </div>
  );
};

export default SliderPanel;
