import { StatusCodes } from "http-status-codes";

class HttpException extends Error {
    public status: number;
    public message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

class NotFoundExeption extends HttpException {
    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export class BadRequestExeption extends HttpException {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

export class SupplierNotFoundExeption extends NotFoundExeption {
    constructor() {
        super("Supplier Not Found");
    }
}

export class ItemNotFoundExeption extends NotFoundExeption {
    constructor() {
        super("Item Not Found");
    }
}

export class ItemNotInSupplierExeption extends NotFoundExeption {
    constructor() {
        super("Item Not In Supplier");
    }
}

export class OrderNotFoundExeption extends NotFoundExeption {
    constructor() {
        super("Order Not Found");
    }
}

export class JoiException extends HttpException {
    constructor(message: string) {
        super(StatusCodes.UNPROCESSABLE_ENTITY, message);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string) {
        super(StatusCodes.FORBIDDEN, message);
    }
}

export default HttpException;
