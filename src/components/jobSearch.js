import React, {useEffect, useState} from "react"
import "../styles/jobSearch.css"
import axios from "axios"

const JobSearch = () => {

    const options = {
    method: 'GET',
    url: 'https://latestreactjsjobs.p.rapidapi.com/getReedJobs',
    params: {customKey: 'm8!zYcYUAPxqLj!zQ5tu'},
    headers: {
        authorization: 'Basic MzU3MGU1MGEtM2JkNi00OTE3LWI4ODEtZGRmODU4YWI4MjczOg==',
        'x-rapidapi-key': '787be5b82cmshc896e10d7e5bdd5p109196jsnd6269dd423b3',
        'x-rapidapi-host': 'latestreactjsjobs.p.rapidapi.com'
    }
    };

    var jobsArray = []
    const [jobsStateArray, setJobsStateArray] = useState([])

    useEffect(() => {          
        axios.request(options).then(function (response) {
            console.log(response.data.results);
            response.data.results.map((item, index) => {
                jobsArray.push(item)
            })
            setJobsStateArray(jobsArray)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    return(
        <div className="jobSearchComponentContainer">
            <h2>Your Next Job Awaits</h2>

            {jobsStateArray.map((item, index) => {
                return(
                    <div className="jobCard">
                        <p><strong>Job Title</strong>: {item.jobTitle}</p>
                        <p><strong>Location</strong>: {item.locationName}</p>
                        <p><strong>Salary Range({item.currency})</strong>: {item.minimumSalary} - {item.maximumSalary}</p>
                        <a href={item.jobUrl} target="_blank" >Go To Job Post</a>
                    </div>
                )
            })}

        </div>
    )
}

export default JobSearch