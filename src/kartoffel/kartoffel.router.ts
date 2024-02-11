import { Router } from "express";
import { kartoffelUsersHandler } from "./kartoffel.controller";

const router: Router = Router();

router.get("/users/:search", kartoffelUsersHandler);

export default router;
