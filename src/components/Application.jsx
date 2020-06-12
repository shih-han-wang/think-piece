import React from "react";

import Posts from "./Posts";
import Authentication from "./Authentication";

const Application = () => (
  <main className="Application">
    <Authentication />
    <h1> Think Piece </h1>
    <Posts />
  </main>
);

export default Application;
