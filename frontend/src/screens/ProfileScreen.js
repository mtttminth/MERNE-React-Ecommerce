import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const history = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col xs={14}>
              <FloatingLabel controlId='name' label='Name' className='mb-3'>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col xs={14}>
              <FloatingLabel
                controlId='email'
                label='Email address'
                className='mb-3'
              >
                <Form.Control
                  type='email'
                  placeholder='name@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col xs={14}>
              <FloatingLabel
                controlId='password'
                label='Password'
                className='mb-3'
              >
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col xs={14}>
              <FloatingLabel
                controlId='confirmPassword'
                label='Confirm Password'
                className='mb-3'
              >
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>My Orders</Col>
    </Row>
  )
}

export default ProfileScreen
