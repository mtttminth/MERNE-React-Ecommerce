import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

//TODO fix redirect for react-router@6

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // const { search } = useLocation()
  // const redirectQuery = new URLSearchParams(search).get('qty')
  // const redirect = redirectQuery ? redirectQuery : '/'

  const redirect = useLocation.search ? useLocation.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col xs={7}>
            <FloatingLabel
              controlId='floatingInput'
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
            <FloatingLabel controlId='floatingPassword' label='Password'>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
