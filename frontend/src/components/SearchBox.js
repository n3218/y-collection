import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("")

  const onsubmitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }

  return (
    <Form onSubmit={onsubmitHandler} inline>
      <Form.Control value={keyword} type="text" name="q" onChange={e => setKeyword(e.target.value)} placeholder="Search Products..." className="mr-sm-2 ml-sm-2"></Form.Control>
      <Button type="submit">Search</Button>
    </Form>
  )
}

export default SearchBox
