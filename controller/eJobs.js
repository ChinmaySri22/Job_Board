const Job = require("../models/Job");
const Employer = require("../models/Employer");

exports.addJob = (req, res) => {
  res.render("addJob");
};

exports.addJobPost = async (req, res) => {
  const {
    title,
    description,
    location,
    mode,
    expiryDate,
    salary,
    jobType,
    experience,
    skills,
    education,
    companyWebsite,
    contactEmail,
    status,
    industry,
    benefits,
  } = req.body;

  try {
    // Ensure req.user is populated correctly
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const employerId = req.user._id;

    // Create a new job post
    const newJobPost = new Job({
      title,
      description,
      location,
      mode,
      company: employerId,
      expiryDate,
      salary,
      jobType,
      experience,
      skills,
      education,
      companyWebsite,
      contactEmail,
      status,
      industry,
      benefits,
    });

    // Save the job post to the database
    await newJobPost.save();

    // Update employer's jobsPosted list
    const employer = await Employer.findById(employerId);
    if (!employer) {
      throw new Error("Employer not found");
    }
    employer.jobsPosted.push(newJobPost._id);
    await employer.save();

    res.status(200).send(
      `<script>alert("Job Posted Successfully");</script>
       <meta http-equiv="refresh" content="0.1;url=/employer/addJob">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating job post",
      error: error.message,
    });
  }
};

exports.jobFeed = async (req, res) => {
  try {
    // Fetch all jobs along with their associated employer data
    const jobs = await Job.find().populate("company").exec();

    // Debugging: Check the jobs array to ensure that company data is populated

    res.render("feed", { jobs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching job postings");
  }
};
