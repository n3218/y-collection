import React from "react"
import { Image } from "react-bootstrap"

const ImageLarge = ({ image, name }) => {
  return (
    <>
      {image &&
        image.map(i => (
          <div key={i}>
            <div className="bg-dark text-light">{i}:</div>
            <Image src={i} alt={name} title={name} fluid />
          </div>
        ))}
    </>
  )
}

export default ImageLarge
