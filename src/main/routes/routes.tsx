import React from "react";
import { RouteType } from "./routeConstants";
import { Route, Switch } from "react-router-dom"; // <-- New code

//...route configs don't change...

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
const RouteWithSubRoutes = (route: RouteType) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props: any) => (
      <route.component {...props} routes={route.routes || []} />
    )}
  />
);

export default RouteWithSubRoutes;
