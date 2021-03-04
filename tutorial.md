## Creating your own Job Board with React and Gatsby

We’ll be learning how to write a simple dynamic React application using open source tools to make our lives easier and our application more efficient. The appliation is a Job Board which will display the latest software jobs in the UK because we all have to get paid at some point right? We’re going to use GatsbyJS, a framework known for its simple workflow and producing fast React web applications. 

If you haven’t worked with Gatsby before you’re still in the right place as this tutorial only requires basic React knowledge for you to follow through. 

When all is set and done this is how our Job Board will look like.

![Git 1](https://user-images.githubusercontent.com/39013207/109974867-acf3d680-7d02-11eb-83ae-3dc7eeaa5b06.JPG)


## Gatsby Setup

Let’s go ahead and install the GatsbyJS CLI using the following command:

```
npm i -g gatsby
```

After this, we can use the gatsby command to initialize a new boilerplate GatsbyJS site by running the following command in your preferred directory.

```
gatsby new react-job-search
```

where the last argument is the name you want to give your application. As you can see, I’ve chosen to call mine react-job-search.
When this is done cd into the newly created folder and run `gatsby develop` there.

The last command produces a development build of the app we just created. To view it, open localhost:8000 in your browser. We’ll change the site title and delete everything else on the index page. Open the gatsby-config.js file in the project root directory and change the site title value to ‘Browse UK Software Jobs’.

Next, let's open the layout.js component file and delete the footer tag to leave the return method of the component looking like so:

```
return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
)
```

## Job Search Component Setup

It’s time to create the jobSearch component we’re going to import on the index page. In the components folder, create a file called jobSearch.js and paste the following code into it. 

```
import React from "react"

const JobSearch = () => {

  return(
        <div className="jobSearchComponentContainer"></div>)
}
export default JobSearch
```

Open the src/pages/index.js file, import this component and delete everything else except for the Layout and SEO tags. Done correctly, your index.js file should look like this after you’ve imported the jobSearch component.

```
import React from "react"
import JobSearch from "../components/jobSearch"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <JobSearch />
  </Layout>
)

export default IndexPage
```

Awesome, we can now see the changes we make to our component as we add the updates.

## Rapid API Account Setup

Visit [Rapid API](https://rapidapi.com/shuaibam1/api/latestreactjsjobs) and create an account if you don’t have one with them already in order to use their services.  If you followed the aforementioned link, you’d have landed at the LatestReactJobs API page where you can view the api’s details. 

Click on the Pricing link and subscribe to the API. That’s it, you can now also use this marvellous piece of work at no cost to your wallet!

Go back to the Endpoints tab and under the Code Snippets section on the right change the language from Node.js to JavaScript > Axios. This will show you the equivalent JS code you need to paste in the jobSearch component for our app to be allowed access to the API.

## API Integration

Head back to your text editor and add the axios module. Run the following command:

	npm i axios

Import axios in the jobSearch component and paste the axios code snippet from the API page here. As this is a functional component we’ll use hooks to implement the componentDidMount lifecycle method and paste the actual code for the request inside the useEffect hook like shown below: 

```
import React, {useEffect, useState} from "react"
import axios from "axios"

const JobSearch = () => {

    const options = {
    method: 'GET',
    url: 'https://latestreactjsjobs.p.rapidapi.com/getReedJobs',
    params: {customKey: 'YOUR KEY HERE'},
    headers: {
        authorization: 'Basic YOUR KEY HERE',
        'x-rapidapi-key': 'YOUR KEY HERE',
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
            setAllCitiesJobs(jobsArray)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])
```

You’ll notice our code has been modified to make use of state and the map function to update the array of the jobs received from the API request. This ensures our component re-renders upon the successful completion of our request.

Next, it’s time to display the results of the API call. Modify the return method of the component to map through the jobsStateArray whilst displaying the contents of each job object as follows:

```
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
        </div>)
```

![Git3](https://user-images.githubusercontent.com/39013207/109975853-c1849e80-7d03-11eb-969a-08e981401e60.JPG)

This is how our app now looks like. It's working but let's do something about its appearance.

Create a styles directory in the src folder and inside the styles directory create a file named jobSearch.css and add the following [styles](https://github.com/AnesuMurakata/react-job-search/blob/master/src/styles/jobSearch.css) to make the job cards more visually appealing.

Don’t forget to import the styles in jobSearch.js or risk wrongly accusing hot reload of not working.

So far our app is great but it’s lacking user interaction. Let’s add a filter to only view jobs for the selected city. Modify the jobSearch component to add a dropdown of cities and a method to handle the most recently selected city.

```
<h4>Filter By City:</h4>
      <select onChange={e => handleFilterByCity(e.target.value)} >
          <option value={0}>All</option>
          <option value={1}>Cardiff</option>
          <option value={2}>London</option>
          <option value={3}>Manchester</option>
          <option value={4}>South West England</option>
      </select>

      <hr/>
 ```
 
Now declare the handleFilterByCity method whose logic which will need us to create another state for keeping track of all the cities. When a user selects a city our method will loop through this state and only push job objects which have their locationName attribute equal to the selected city in the jobsStateArray (the array that’ll be updated every time a user makes a new change.)

```
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
```

The final step is to update the allCitiesJobs state when the component successfully mounts. Add the following line in the useEffect hook directly below the line that initializes the jobsStateArray:

	setAllCitiesJobs(jobsArray)

When this bit is done we can now show off our app to our not so tech savvy friends that we’ve made our very own LinkedIn for software jobs. Cool right? 
