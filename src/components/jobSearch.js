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
    const [allCitiesJobs, setAllCitiesJobs] = useState([])

    useEffect(() => {          
        axios.request(options).then(function (response) {
            console.log(response.data.results);
            response.data.results.map((item, index) => {
                jobsArray.push(item)
            })
            setJobsStateArray(jobsArray)
            setAllCitiesJobs(jobsArray)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const handleFilterByCity = (city) => {

        var recentlySelectedCityJobs = []
        switch(city){
            case "0":
                setJobsStateArray(allCitiesJobs)
                break
            case "1":
                allCitiesJobs.map((item, index) => {
                    if(item.locationName === "Cardiff"){
                        recentlySelectedCityJobs.push(item)
                    }
                })
                setJobsStateArray(recentlySelectedCityJobs)
                break
            case "2":
                allCitiesJobs.map((item, index) => {
                    if(item.locationName === "London"){
                        recentlySelectedCityJobs.push(item)
                    }
                })
                setJobsStateArray(recentlySelectedCityJobs)
                break
            case "3":
                allCitiesJobs.map((item, index) => {
                    if(item.locationName === "Manchester"){
                        recentlySelectedCityJobs.push(item)
                    }
                })
                setJobsStateArray(recentlySelectedCityJobs)
                break
            case "4":
                allCitiesJobs.map((item, index) => {
                    if(item.locationName === "South West England"){
                        recentlySelectedCityJobs.push(item)
                    }
                })
                setJobsStateArray(recentlySelectedCityJobs)
                break
            default:
                console.log('Do nothing...')
        }
    }

    return(
        <div className="jobSearchComponentContainer">
            <h2>Your Next Job Awaits</h2>

            <h4>Filter By City:</h4>
            <select onChange={e => handleFilterByCity(e.target.value)} >
                <option value={0}>All</option>
                <option value={1}>Cardiff</option>
                <option value={2}>London</option>
                <option value={3}>Manchester</option>
                <option value={4}>South West England</option>
            </select>

            <hr/>

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