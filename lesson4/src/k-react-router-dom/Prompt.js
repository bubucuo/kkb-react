import React from "react";
import {RouterContext} from "./Context";
import LifeCycle from "./LifeCycle";

export default function Prompt({message, when = true}) {
  return (
    <RouterContext.Consumer>
      {context => {
        if (!when) {
          return null;
        }
        let method = context.history.block;
        return (
          <LifeCycle
            onMount={self => {
              self.release = method(message);
            }}
            onUnmount={self => {
              self.release();
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
