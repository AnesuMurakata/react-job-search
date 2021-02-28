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
