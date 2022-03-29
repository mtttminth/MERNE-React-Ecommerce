import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

//TODO fix redirect for react-router@6

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const history = useNavigate()
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = useLocation.search ? useLocation.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col xs={7}>
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
          <Col xs={7}>
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
          <Col xs={7}>
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
          <Col xs={7}>
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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
