import { Route, Switch } from "react-router-dom"; // <-- New code
import { RouteType } from "./routeConstants";
import RouteWithSubRoutes from "./routes";
import AppRoutes from "./routeConstants";

type Props = { routes: RouteType[] };
export function RenderRoutes({ routes }: Props) {
  return (
    <Switch>
      {routes.map((route) => {
        return RouteWithSubRoutes(route);
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export { AppRoutes };
