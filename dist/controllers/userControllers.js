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
exports.deleteMember = exports.fetchOneMember = exports.updateMember = exports.registerMember = void 0;
const uuid_1 = require("uuid");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const dbhelper = new dbhelpers_1.default();
const registerMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, cohortNumber, firstName, lastName, password, phone_number } = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@thejitu.com$/;
        const isValidEmail = emailRegex.test(email);
        const isValidCohortNumber = Number.isInteger(cohortNumber) && cohortNumber > 0;
        if (!isValidEmail || !isValidCohortNumber) {
            return res
                .status(400)
                .json({ error: "Invalid email format or cohort number" });
        }
        const emailTaken = yield dbhelper.query(`SELECT * FROM members WHERE email = '${email}'`);
        if (emailTaken.length > 0) {
            return res.status(400).json({ error: "This email is already in use" });
        }
        const memberId = (0, uuid_1.v4)();
        yield dbhelper.query(``);
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to register member" });
    }
});
exports.registerMember = registerMember;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.id;
        const { firstName, lastName, cohortNumber } = req.body;
        yield dbhelper.query(`UPDATE members SET first_name = '${firstName}', last_name = '${lastName}', cohort_number = ${cohortNumber} WHERE member_id = '${memberId}'`);
        return res.status(200).json({ message: "Member updated successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update member" });
    }
});
exports.updateMember = updateMember;
const fetchOneMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.id;
        const member = yield dbhelper.query(`SELECT * FROM members WHERE member_id = '${memberId}'`);
        if (member.length === 0) {
            return res.status(404).json({ error: "Member not found" });
        }
        return res.status(200).json({ member: member[0] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch member" });
    }
});
exports.fetchOneMember = fetchOneMember;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.id;
        yield dbhelper.query(`DELETE FROM members WHERE member_id = '${memberId}'`);
        return res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete member" });
    }
});
exports.deleteMember = deleteMember;
