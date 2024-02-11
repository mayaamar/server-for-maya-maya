import { Router } from "express";
import joiValidationMiddleware from "../middlewares/joiValidation.middleware";
import {
    ChangeItemValidationSchema,
    IdValidationSchema,
    NameValidationSchema,
    NewItemValidationSchema,
    SearchValidationSchema,
} from "../utils/joi.schemas";
import tryCatchWrapper from "../utils/tryCatchWrapper";
import {
    addItemHandler,
    changeItemHandler,
    getAllItemsHandler,
    getItemByIdHandler,
    getItemHandler,
    getItemsBySearchHandler,
    removeItemHandler,
} from "./item.controller";

const router: Router = Router();

router.delete("/:id", joiValidationMiddleware(IdValidationSchema), tryCatchWrapper(removeItemHandler));
router.post("/", joiValidationMiddleware(NewItemValidationSchema), tryCatchWrapper(addItemHandler));
router.get("/id/:id", joiValidationMiddleware(IdValidationSchema), tryCatchWrapper(getItemByIdHandler));
router.get("/search/:search", joiValidationMiddleware(SearchValidationSchema), tryCatchWrapper(getItemsBySearchHandler));
router.get("/search", tryCatchWrapper(getItemsBySearchHandler));
router.get("/name/:name", joiValidationMiddleware(NameValidationSchema), tryCatchWrapper(getItemHandler));
router.get("/", tryCatchWrapper(getAllItemsHandler));
router.patch("/:id", joiValidationMiddleware(ChangeItemValidationSchema), tryCatchWrapper(changeItemHandler));

export default router;
