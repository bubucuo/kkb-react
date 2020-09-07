// const { app, models: resolveModels, component: resolveComponent } = config;
import dynamic from "dva/dynamic";
import app from "../app";

export const UserPageDynamic = dynamic({
  app,
  models: () => [import("../models/user")],
  component: () => import("../routes/UserPage")
});
