import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Connection from "../dbhelpers/dbhelpers";
import { sqlConfig } from "../config/sqlConfig";

const dbhelper = new Connection();

export const registerMember = async (req: Request, res: Response) => {
  try {
    const { email, cohortNumber, firstName, lastName, password, phone_number } =
      req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@thejitu.com$/;
    const isValidEmail = emailRegex.test(email);
    const isValidCohortNumber =
      Number.isInteger(cohortNumber) && cohortNumber > 0;

    if (!isValidEmail || !isValidCohortNumber) {
      return res
        .status(400)
        .json({ error: "Invalid email format or cohort number" });
    }

    const emailTaken = await dbhelper.query(
      `SELECT * FROM members WHERE email = '${email}'`
    );

    if (emailTaken.length > 0) {
      return res.status(400).json({ error: "This email is already in use" });
    }

    const memberId = uuidv4();
    await dbhelper.query(``);

    return res.status(201).json({
      message: "Member registered successfully",
      member: {
        memberId,
        email,
        cohortNumber,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to register member" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;
    const { firstName, lastName, cohortNumber } = req.body;

    await dbhelper.query(
      `UPDATE members SET first_name = '${firstName}', last_name = '${lastName}', cohort_number = ${cohortNumber} WHERE member_id = '${memberId}'`
    );

    return res.status(200).json({ message: "Member updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update member" });
  }
};

export const fetchOneMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;
    const member = await dbhelper.query(
      `SELECT * FROM members WHERE member_id = '${memberId}'`
    );

    if (member.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    return res.status(200).json({ member: member[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch member" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;
    await dbhelper.query(`DELETE FROM members WHERE member_id = '${memberId}'`);

    return res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete member" });
  }
};
