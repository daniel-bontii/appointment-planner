import React from "react";

import { AppointmentTile } from "../tile/AppointmentTile";

export const AppointmentTileList = ({ tiles }) => {
  return (
    <div>
      {tiles.map((tile, index) => (
        <AppointmentTile key={index} tile={tile} />
      ))}
      
    </div>
  );
};
