import React from 'react';

const LoadingCube = () => {
  return (
    <div className="relative w-16 h-16">
      <div className="cube">
        <div className="cube-face cube-face-front"></div>
        <div className="cube-face cube-face-back"></div>
        <div className="cube-face cube-face-right"></div>
        <div className="cube-face cube-face-left"></div>
        <div className="cube-face cube-face-top"></div>
        <div className="cube-face cube-face-bottom"></div>
      </div>
    </div>
  );
};

export default LoadingCube; 