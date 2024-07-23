const express = require("express");
const router = express.Router();
const employer = require("../controller/eLogin");
const employerSignup = require("../controller/eSignup");
const job = require("../controller/eJobs");
const cookie = require("../middleware/cookies");
const home = require("../controller/employerHome");
const changes = require("../controller/employerEdit");

// Employer login/signup
router.get("/login", employer.eLoginRender); // Render employer login form
router.post("/login", employer.eLoginPost); // Handle employer login form submission
router.get("/signup", employerSignup.eSignupRender); // Render employer signup form
router.post("/signup", employerSignup.eSignupPost); // Handle employer signup form submission

// Job posting Employer side
router.get("/dashboard", cookie.checkCookiesEmployer, home.employerHome);
router.get("/addJob", cookie.checkCookiesEmployer, job.addJob); // Render job posting form
router.post("/addJobPost", cookie.checkCookiesEmployer, job.addJobPost); // Handle job posting form submission

router.get("/edit/:id", cookie.checkCookiesEmployer, changes.edit);
router.post("/edit/:id", cookie.checkCookiesEmployer, changes.editPost);
router.get("/delete/:id", cookie.checkCookiesEmployer, changes.delete);

module.exports = router;
