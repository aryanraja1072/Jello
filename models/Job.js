import mongoose from 'mongoose'

/*
TODO:

FIXME:
 - search not working

 Challenge: making the search work
*/
const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        trim: true,
        text: true
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        trim: true,
        text: true
    },
    jobId: {
        type: String,
        trim: true,
        text: true

    },
    location: {
        type: String,
        required: [true, 'Please provide location'],
        trim: true,
        text: true
    },
    link: {
        type: String,
        required: [true, 'Please provide link'],
        trim: true
    },
    status: {
        type: String,
        enum: ['applied', 'offered', 'rejected', 'scheduled', 'pending'],
        default: 'pending'
    },
    event: {
        type: String,
        trim: true,
        text: true
    },
    eventDate: {
        type: Date
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'internship',
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        reference: 'User',
        required: [true, 'Please provide user id']
    }
}, { timestamps: true })
export default mongoose.model('Job', JobSchema)