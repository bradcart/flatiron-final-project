import React from "react";
import { App } from "./App";
import { LoadTemplate } from ".pages/LoadTemplate";
import { Edit } from "./pages/Edit";
const routes = {
  "/": () => <App />,
  "/template": () => <LoadTemplate />,
  "/template/edit": () => <Edit />
};

export default routes;