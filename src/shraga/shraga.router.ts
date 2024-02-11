import { Router } from "express";
import { authCallbackHandler, authLoginHandler, getSelfHandler } from "./shraga.controller";

const router: Router = Router();

router.get("/auth/login", authLoginHandler);
router.post("/auth/callback", authCallbackHandler);
router.get("/self", getSelfHandler);

export default router;
