"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userControllers_1 = require("./userControllers");
describe("User Registration", () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    it("successfully registers a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {},
        };
        jest
            .spyOn(bcrypt_1.default, "hash")
            .mockResolvedValueOnce("HashedPass@word123");
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute,
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest),
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValue(mockedPool);
        yield (0, userControllers_1.registerUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: "Uregistered successfully",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(mockedInput).toHaveBeenCalledWith("password", mssql_1.default.VarChar, "HashedPass@word123");
        expect(mockedInput).toHaveBeenCalledWith("name", mssql_1.default.VarChar, "Test Test");
        expect(mockedInput).toHaveBeenCalledWith("email", mssql_1.default.VarChar, "test@yopmail.com");
        expect(mockedInput).toHaveBeenCalledWith("id_no", mssql_1.default.Int, "367577998");
    }));
});
