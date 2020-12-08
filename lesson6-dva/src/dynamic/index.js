import dynamic from "dva/dynamic";
import { app } from "../index";

export const UserDynamic = dynamic({
  app,
  models: () => [import("../models/user")],
  component: () => import("../routes/UserPage")
});
