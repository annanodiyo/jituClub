import mssql from "mssql";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { registerUser } from "./userControllers";

describe("User Registration", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("successfully registers a user", async () => {
    const req = {
      body: {},
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    const mockedInput = jest.fn().mockReturnThis();

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as Request, res as any);

    expect(res.json).toHaveBeenCalledWith({
      message: "Uregistered successfully",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockedInput).toHaveBeenCalledWith(
      "password",
      mssql.VarChar,
      "HashedPass@word123"
    );
    expect(mockedInput).toHaveBeenCalledWith(
      "name",
      mssql.VarChar,
      "Test Test"
    );
    expect(mockedInput).toHaveBeenCalledWith(
      "email",
      mssql.VarChar,
      "test@yopmail.com"
    );
    expect(mockedInput).toHaveBeenCalledWith("id_no", mssql.Int, "367577998");
  });
});
