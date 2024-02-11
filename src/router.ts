import { Router } from "express";
import itemRouter from "./item/item.router";
import kartoffelRouter from "./kartoffel/kartoffel.router";
import orderRouter from "./order/order.router";
import shragaRouter from "./shraga/shraga.router";
import supplierRouter from "./supplier/supplier.router";

const router: Router = Router();

router.use("/items", itemRouter);
router.use("/suppliers", supplierRouter);
router.use("/orders", orderRouter);
router.use("/kartoffel", kartoffelRouter);
router.use(shragaRouter);

export default router;
