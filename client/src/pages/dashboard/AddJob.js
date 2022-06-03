import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


/*
TODO:
  - correct button layout and fix done button color
FIXME:

*/
const AddJob = () => {
    const {
        isLoading,
        showAlert,
        isEditing,
        displayAlert,
        position,
        company,
        jobId,
        jobLocation,
        jobType,
        jobTypeOptions,
        link,
        event,
        eventDate,
        status,
        statusOptions,
        handleChange,
        clearJobForm,
        doneEditJob,
        addJob
    } = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!position || !company || !jobLocation || !link || !jobId) {
            displayAlert()
            return
        }
        // if (isEditing) {
        //     editJob()
        //     return
        // }
        addJob({ company, position, location: jobLocation, link, jobId, event, eventDate, status, jobType })
    }
    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    {/* position */}
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type='text'
                        labelText='job location'
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />


                    {/* job status */}
                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    {/* job type */}
                    <FormRowSelect
                        name='jobType'
                        labelText='job type'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    <FormRow
                        type='text'
                        labelText='job id'
                        name='jobId'
                        value={jobId}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        labelText='link'
                        name='link'
                        value={link}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        labelText='event'
                        name='event'
                        value={event}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='date'
                        labelText='event date'
                        name='eventDate'
                        value={eventDate}
                        handleChange={handleJobInput}
                    />
                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        {isEditing && <button
                            type='submit'
                            className='btn btn-block done-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                doneEditJob()
                            }}
                            disabled={isLoading}
                        >
                            done
                        </button>}
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearJobForm()
                            }}
                        >
                            clear
                        </button>

                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob