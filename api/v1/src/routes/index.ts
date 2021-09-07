import {Router,Request,Response,NextFunction} from "express";

import phone_detail_route from "../routes/phone_routes";
const routes=Router();
routes.use("/v1",phone_detail_route)

export default routes;