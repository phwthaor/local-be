const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

const PROFILE_PATH = "./data/build_profiles.json";
const JOB_PATH = "./data/build_jobs.json";

// ================== PROFILE ==================

async function getProfiles() {
  try {
    const data = await fs.readJson(PROFILE_PATH);
    return data;
  } catch (err) {
    // Nếu file chưa tồn tại, trả về mảng rỗng
    return [];
  }
}

async function getProfileById(id) {
  const profiles = await getProfiles();
  return profiles.find((profile) => profile.id === id);
}

async function createProfile(profile) {
  const profiles = await getProfiles();
  const newProfile = {
    ...profile,
    id: uuidv4(),
  };
  profiles.push(newProfile);
  await fs.writeJson(PROFILE_PATH, profiles, { spaces: 2 });
  return newProfile;
}

async function updateProfile(data) {
  const profiles = await getProfiles();
  const index = profiles.findIndex((profile) => profile.id === data.id);
  if (index === -1) {
    throw new Error("Profile not found");
  }
  profiles[index] = { ...profiles[index], ...data };
  await fs.writeJson(PROFILE_PATH, profiles, { spaces: 2 });
  return profiles[index];
}

// ================== JOB ==================

async function getJobs() {
  try {
    const data = await fs.readJson(JOB_PATH);
    return data;
  } catch (err) {
    return [];
  }
}
async function getJobById(id) {
  const jobs = await getJobs();
  return jobs.find((job) => job.id === id);
}

async function createJob(job) {
  const jobs = await getJobs();
  const newJob = {
    ...job,
    id: uuidv4(),
  };
  jobs.push(newJob);
  await fs.writeJson(JOB_PATH, jobs, { spaces: 2 });
  return newJob;
}

// ================== EXPORT ==================

module.exports = {
  getProfiles,
  createProfile,
  getJobs,
  createJob,
  getProfileById,
  getJobById,
  updateProfile,
};
