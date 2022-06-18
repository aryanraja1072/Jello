import React from 'react'
import { SearchContainer, JobsContainer } from '../../components'
/*
TODO:

FIXME:
 - show updated list of jobs without reloading page
*/

const AllJobs = () => {
    return (
        <>
            <SearchContainer />
            <JobsContainer />
        </>
    )
}

export default AllJobs