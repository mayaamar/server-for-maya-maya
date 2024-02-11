import { Router } from "express";
import joiValidationMiddleware from "../middlewares/joiValidation.middleware";
import {
    ChangeSupplierItemValidationSchema,
    ChangeSupplierValidationSchema,
    DeleteSupplierItemValidationSchema,
    IdValidationSchema,
    NewSupplierItemValidationSchema,
    NewSupplierValidationSchema,
} from "../utils/joi.schemas";
import tryCatchWrapper from "../utils/tryCatchWrapper";
import {
    addSupplierHandler,
    addSupplierItemHandler,
    changeSupplierHandler,
    changeSupplierItemHandler,
    deleteSupplierItemHandler,
    getAllSuppliersHandler,
    getSupplierHandler,
    removeSupplierHandler,
} from "./supplier.controller";

const router: Router = Router();

router.delete("/:id", joiValidationMiddleware(IdValidationSchema), tryCatchWrapper(removeSupplierHandler));
router.post("/", joiValidationMiddleware(NewSupplierValidationSchema), tryCatchWrapper(addSupplierHandler));
router.get("/:id", joiValidationMiddleware(IdValidationSchema), tryCatchWrapper(getSupplierHandler));
router.get("/", tryCatchWrapper(getAllSuppliersHandler));
router.patch("/:id", joiValidationMiddleware(ChangeSupplierValidationSchema), tryCatchWrapper(changeSupplierHandler));
router.post(
    "/:id/items",
    joiValidationMiddleware(NewSupplierItemValidationSchema),
    tryCatchWrapper(addSupplierItemHandler)
);
router.delete(
    "/:id/items/:itemName",
    joiValidationMiddleware(DeleteSupplierItemValidationSchema),
    tryCatchWrapper(deleteSupplierItemHandler)
);
router.patch(
    "/:id/items/:name/:newPrice",
    joiValidationMiddleware(ChangeSupplierItemValidationSchema),
    tryCatchWrapper(changeSupplierItemHandler)
);

export default router;
