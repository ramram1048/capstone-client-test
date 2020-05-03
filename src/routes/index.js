import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import ProductListPage from '../components/Product/ProductListPage'
import ProductDetailPage from '../components/Product/ProductDetailPage'
import OrderPage from '../components/Order/OrderPage'
import CommunityPage from '../components/Community/CommunityPage'
import NoMatch from '../components/NoMatch'

const routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hello" component={Hello} />
        <Route path="/counter" component={Counter} />  
        <Route path="/productList" component={ProductListPage} /> 
        <Route path="/product" component={ProductDetailPage} /> 
        <Route path="/order" component={OrderPage} /> 
        <Route path="/community" component={CommunityPage} fetchurl="https://jsonplaceholder.typicode.com/posts" /> 
        <Route component={NoMatch} />
      </Switch>
)

export default routes
