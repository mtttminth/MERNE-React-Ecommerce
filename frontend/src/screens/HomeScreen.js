import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Row,
  Col,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const { keyword } = useParams()
  const { pageNumber } = useParams() || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')
  const handleCategories = (category) => setSelectedCategory(category)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col sm={12} className='text-center my-4'>
              <h3>Categories</h3>
              <DropdownButton
                as={ButtonGroup}
                title={selectedCategory}
                variant='secondary'
              >
                {allCategories.map((category) => (
                  <Col key={category} sm={12}>
                    <Dropdown.Item
                      eventKey={category}
                      onClick={() => handleCategories(category)}
                      style={{ margin: '5px' }}
                    >
                      {category}
                    </Dropdown.Item>
                  </Col>
                ))}
              </DropdownButton>
            </Col>

            {/* <ButtonGroup>
            <Col sm={12} className='text-center my-4'>
              {allCategories.map((category) => (
                <Button
                  onClick={() => handleClick(category)}
                  key={category}
                  variant='secondary'
                  style={{ margin: '5px' }}
                >
                  {category}
                </Button>
              ))}
            </Col>
          </ButtonGroup> */}
            {products
              .filter(
                (product) =>
                  selectedCategory === 'All' ||
                  product.category === selectedCategory
              )
              .map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}
// {products.map((product) => (
export default HomeScreen

//NOTE https://stackoverflow.com/questions/67862657/filtering-by-categories-react-and-bootstrap
//TODO category filter https://stackoverflow.com/questions/59907539/
