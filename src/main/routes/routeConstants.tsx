import React, { lazy } from "react";
import LandingPage from "../../pages/landing";
import Organisation from "../../pages/organisation";

export type RouteType = {
  path: string;
  key: string;
  exact: boolean;
  component: React.ComponentType;
  routes?: RouteType[];
};

const ROUTES: RouteType[] = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: LandingPage,
  },
  {
    path: "/organisations",
    key: "ROOT",
    exact: true,
    component: Organisation,
  },
  { path: "*", key: "404", exact: true, component: () => <div>404</div> },
];

export default ROUTES;
