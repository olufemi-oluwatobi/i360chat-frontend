import React from "react";
import { AppRoutes } from "./routes";
import Store from "./state_config/store";

import "./app.css";
import { RenderRoutes } from "./routes";

function App() {
  return (
    <Store>
      <RenderRoutes routes={AppRoutes} />
    </Store>
  );
}

export default App;
