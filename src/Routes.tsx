import React from "react";
import { Route, HashRouter, Routes as Routing } from "react-router-dom";

import { Home, DragAndDropExample } from "./pages";

const Routes = () => {
  return(
      <HashRouter>
          <Routing>
            <Route Component = { Home }  path="/" />
            <Route Component = { DragAndDropExample }  path="/drag" />
          </Routing>
      </HashRouter>
  )
}

export default Routes