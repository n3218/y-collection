import React from "react"
import { Helmet } from "react-helmet"
import { appname } from "../constants/commonConstants"

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: appname + ` | Welcome to my Yarn Collection!`,
  description: "Bautiful yarns for knot lovers"
}

export default Meta
