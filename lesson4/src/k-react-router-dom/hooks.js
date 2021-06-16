// useHistory, useLocation, useRouteMatch, useParams

import {useContext} from "react";
import RouterContext from "./RouterContext";

export function useHistory() {
  const value = useContext(RouterContext);
  return value.history;
}

export function useLocation() {
  const value = useContext(RouterContext);
  return value.location;
}
export function useRouteMatch() {
  const value = useContext(RouterContext);
  return value.match;
}
export function useParams() {
  const match = useContext(RouterContext).match;
  return match ? match.params : {};
}
