import { ChakraProvider, theme } from '@chakra-ui/react'
import { Layout } from 'components/Layout'
import PrivateRoute from 'PrivateRoute'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  Cart,
  Home,
  Login,
  Product,
  Profile,
  Register,
  Shipping
} from './screens'

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Layout>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/product/:id'>
            <Product />
          </Route>

          <Route path='/cart'>
            <Cart />
          </Route>

          <Route path='/shipping'>
            <Shipping />
          </Route>

          <PrivateRoute path='/profile'>
            <Profile />
          </PrivateRoute>
        </Layout>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  )
}

export default App
