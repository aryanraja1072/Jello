const createJob = async (req, res) => {
    res.send("create job");
}
// create functions similar to createJob for getAllJobs, deleteJob, updateJob, showStats
const getAllJobs = async (req, res) => {
    res.send("get all jobs");
}

const deleteJob = async (req, res) => {
    res.send("delete job");
}

const updateJob = async (req, res) => {
    res.send("update job");
}

const showStats = async (req, res) => {
    res.send("show stats");
}


export { createJob, getAllJobs, deleteJob, updateJob, showStats };