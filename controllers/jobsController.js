import Job from '../models/Job.js';
import { CustomAPIError } from '../Errors/errors.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const { company, position, location, jobId, link, status, event, eventDate, jobType } = req.body;
        if (!company || !position || !location || !jobId || !link || !status || !jobType) {
            throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Please provide all the required fields!");
        }
        const job = await Job.create({ company, position, location, jobId, link, status: status.toLowerCase(), event, eventDate, jobType: jobType.toLowerCase(), createdBy: userId });
        res.status(StatusCodes.CREATED).json(job);
    } catch (error) {
        next(error);
    }
}
// create functions similar to createJob for getAllJobs, deleteJob, updateJob, showStats
const getAllJobs = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { search, status, jobType, sort } = req.query;
        let queryObject = { createdBy: userId }
        if (status && status != 'All') {
            queryObject['status'] = status.toLowerCase()
        }
        if (jobType && jobType != 'All') {
            queryObject['jobType'] = jobType.toLowerCase()
        }
        if (search && search != '') {
            queryObject = { ...queryObject, $text: { $search: search } }
        }
        const jobs = await Job.find(queryObject).sort({ eventDate: (sort === 'Latest' ? -1 : 1) });
        res.status(StatusCodes.OK).json(jobs);
    } catch (error) {
        next(error)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const job_id = req.params.id
        const job = await Job.findOne({ _id: job_id, createdBy: userId })
        if (!job) {
            throw new CustomAPIError(StatusCodes.NOT_FOUND, "Job not found!")
        }
        await job.remove()
        res.status(StatusCodes.OK).json({ message: "Job deleted!" })
    } catch (error) {
        next(error)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const job = await Job.updateOne({ _id: _id, createdBy: userId }, req.body, { new: true, runValidators: true })
        res.status(StatusCodes.OK).json(job)
    } catch (error) {
        next(error)
    }
}

const showStats = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        let stats = await Job.aggregate([{ $match: { createdBy: mongoose.Types.ObjectId(userId) } }, { $group: { _id: "$status", count: { $sum: 1 } } }])
        const statusList = Job.schema.path('status').enumValues;
        stats = stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count
            return acc
        }, {})
        statusList.forEach(status => {
            if (!stats[status]) {
                stats[status] = 0
            }
        })
        let monthlyApplications = await Job.aggregate([
            { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 },
        ])
        monthlyApplications = monthlyApplications
            .map((item) => {
                const {
                    _id: { year, month },
                    count,
                } = item
                const date = moment()
                    .month(month - 1)
                    .year(year)
                    .format('MMM Y')
                return { date, count }
            })
            .reverse()
        res.status(StatusCodes.OK).json({ stats, monthlyApplications })
    } catch (error) {
        next(error)
    }
}


export { createJob, getAllJobs, deleteJob, updateJob, showStats };