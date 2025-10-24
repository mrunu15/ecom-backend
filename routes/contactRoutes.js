import express from "express";
import { sendContactMail } from "../nodemailer/contactMailer.js";

const router = express.Router();

// POST /api/v1/contact
router.post("/contact", sendContactMail);

export default router;
