import { Router } from "express";
import joiValidationMiddleware from "../middlewares/joiValidation.middleware";
import { ChangeOrderValidationSchema, IdValidationSchema, NewOrderValidationSchema } from "../utils/joi.schemas";
import tryCatchWrapper from "../utils/tryCatchWrapper";
import {
    addOrderHandler,
    changeOrderHandler,
    getAllOrdersHandler,
    getDailyMostProfitableItemHandler,
    getHighestAndLowestProfitMarginItemsHandler,
    getMonthlyRevenueHandler,
    getMostProfitableSupplierHandler,
    getOrderHandler,
    getTotalSpentOnSuppliers,
    getWeeklyMostProfitableCategoryHandler,
    removeOrderHandler,
} from "./order.controller";

const router: Router = Router();

router.delete("/:id", joiValidationMiddleware(IdValidationSchema), tryCatchWrapper(removeOrderHandler));
router.post("/", joiValidationMiddleware(NewOrderValidationSchema), tryCatchWrapper(addOrderHandler));
router.get("/:id", joiValidationMiddleware(IdValidationSchema), tryCatchWrapper(getOrderHandler));
router.get("/", tryCatchWrapper(getAllOrdersHandler));
router.patch("/:id", joiValidationMiddleware(ChangeOrderValidationSchema), tryCatchWrapper(changeOrderHandler));
router.get("/monthly-revenue/sum", tryCatchWrapper(getMonthlyRevenueHandler));
router.get("/weekly-profitable/category", tryCatchWrapper(getWeeklyMostProfitableCategoryHandler));
router.get("/daily-profitable/item", tryCatchWrapper(getDailyMostProfitableItemHandler));
router.get("/most-least-profitable/item", tryCatchWrapper(getHighestAndLowestProfitMarginItemsHandler));
router.get("/most-profitable/supplier", tryCatchWrapper(getMostProfitableSupplierHandler));
router.get("/total-spent/suppliers", tryCatchWrapper(getTotalSpentOnSuppliers));

export default router;
