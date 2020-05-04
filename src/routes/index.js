import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import ProductListPage from '../components/Product/ProductListPage'
import ProductDetailPage from '../components/Product/ProductDetailPage'
import OrderPage from '../components/Order/OrderPage'
import ClosetPage from '../components/Closet/ClosetPage'
import DesignPage from '../components/Design/DesignPage'
import CommunityPage from '../components/Community/CommunityPage'
import PostDetailPage from '../components/Community/PostDetailPage'
import NoMatch from '../components/NoMatch'
import Login from '../components/Login'
import PostTester from '../components/PostTester'

const routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hello" component={Hello} />
        <Route path="/counter" component={Counter} />  
        <Route path="/productList" component={ProductListPage} /> 
        <Route path="/product" component={ProductDetailPage} /> 
        <Route path="/order" component={OrderPage} /> 
        <Route path="/closet" component={ClosetPage} /> 
        <Route path="/test" component={PostTester} /> 
        <Route path="/design" component={DesignPage} /> 
        <Route path="/community/post/" component={PostDetailPage}/> 
        <Route path="/community" component={CommunityPage}/>
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
)

export default routes
