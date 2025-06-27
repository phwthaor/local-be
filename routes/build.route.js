const express = require("express");
const router = express.Router();
const buildService = require("../services/build.service");
const { convertDateToNumber } = require("../utils/utils");

router.get("/Job", async (req, res) => {
  try {
    const jobId = req.query.job;

    if (jobId) {
      // Nếu có query id → trả về job theo id
      const job = await buildService.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      return res.status(200).json({ job });
    }

    // Nếu không có query id → trả về toàn bộ jobs
    const jobs = await buildService.getJobs();
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/Profile", async (req, res) => {
  try {
    const profileData = req.body;
    console.log("profileData", profileData);

    if (!profileData.name) {
      return res.status(400).json({ message: "Name  are required" });
    }
    const newProfile = await buildService.createProfile(profileData);
    res.status(201).json({ profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/Profile", async (req, res) => {
  try {
    const profileId = req.query.profile;

    if (profileId) {
      // Nếu có query id → trả về profile theo id
      const profile = await buildService.getProfileById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      return res.status(200).json({ profile });
    }

    // Nếu không có query id → trả về toàn bộ profiles
    const profiles = await buildService.getProfiles();
    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/Run", async (req, res) => {
  try {
    const project = req.body.project;
    const profile = req.body.profile;
    if (!project || !profile) {
      return res
        .status(400)
        .json({ message: "Project and profile are required" });
    }
    //find profile by id and create a job
    const profileData = await buildService.getProfileById(profile);
    if (!profileData) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const job = {
      name: `Build Job for ${project}`,
      projectId: project,
      profileId: profile,
      status: 1,
      date: convertDateToNumber(new Date()),
      userReceived: req.body.userReceived,
      userCreated: "admin",
    };
    const newJob = await buildService.createJob(job);
    await buildService.updateProfile({
      ...profileData,
      lastBuild: newJob.id,
      lastSuccess: newJob.id,
      lastFail: newJob.id,
    });
    res.status(200).json({ jobId: newJob.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/TestCase", async (req, res) => {
  try {
    const profileId = req.query.profile
    if (profileId) {
      const testCases = await buildService.getTestCasesByProfileId(profileId);
      if (!testCases) {
        return res.status(404).json({ message: "not found" });
      }
      return res.status(200).json({ testCases })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.patch("/TestCase", async(req,res)=>{
  try{
    const idTestCase = req.query.id
    const updateData = req.body
    if(!idTestCase){
      return res.status(400).json({ message: "Missing id query param" });
    }
     const existingTestCase = await buildService.getTestCaseById(idTestCase);
     if (!existingTestCase) {
      return res.status(404).json({ message: "Test case not found" });
    }
    const updatedTestCase = {
      ...existingTestCase,
      ...updateData,
    };
    await buildService.updateTestCase(idTestCase, updatedTestCase);

    return res.status(200).json({ message: "Updated successfully", data: updatedTestCase });
  }
  catch(error){
     res.status(500).json({ message: error.message })
  }

})

module.exports = router;
