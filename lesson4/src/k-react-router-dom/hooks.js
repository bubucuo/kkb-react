import {useContext} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

// useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,

export function useHistory() {
  return useContext(RouterContext).history;
}

export function useLocation() {
  return useContext(RouterContext).location;
}

export function useRouteMatch() {
  return useContext(RouterContext).match;
}

export function useParams() {
  const match = useContext(RouterContext).match;
  return match ? match.params : {};
}
