import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import ProductDetail from '../components/ProductDetail'
import OrderPage from '../components/OrderPage'
import NoMatch from '../components/NoMatch'

const routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hello" component={Hello} />
        <Route path="/counter" component={Counter} />  
        <Route path="/product" component={ProductDetail} /> 
        <Route path="/order" component={OrderPage} /> 
        <Route component={NoMatch} />
      </Switch>
)

export default routes
