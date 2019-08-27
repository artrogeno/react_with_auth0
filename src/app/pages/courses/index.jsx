import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap'

import Axios from 'shared/services/axios'
import AuthContext from 'shared/contexts/auth'

const Courses = () => {
  const [Auth] = useContext(AuthContext)
  const [courses, setCourses] = useState([])
  const [message, setMessage] = useState()
  const [load, setLoad] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCourses = async () => {
    setLoad(true)
    try {
      const { data } = await Axios.get('course', {
        headers: { Authorization: `Bearer ${Auth.getAccessToken()}` }
      })
      setCourses(data.courses)

      const {
        data: { message }
      } = await Axios.get('admin', {
        headers: { Authorization: `Bearer ${Auth.getAccessToken()}` }
      })
      setMessage(message)
    } catch (error) {
      setMessage(JSON.stringify(error.message))
    }
  }

  useEffect(() => {
    if (!load) {
      fetchCourses()
    }
  }, [fetchCourses, load])

  return (
    <Row noGutters className="mt-5">
      <Col md={4}>
        {courses &&
          courses.map(course => (
            <ListGroup tag="ul" key={course.id}>
              <ListGroupItem tag="li">{course.title}</ListGroupItem>
            </ListGroup>
          ))}
        <h3 className="mt-3 mb-3">
          Message: <Badge color="info">{message}</Badge>
        </h3>
      </Col>
    </Row>
  )
}

export default Courses
