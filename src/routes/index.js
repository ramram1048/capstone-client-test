import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import ProductCategoryPage from '../components/Product/ProductCategoryPage'
import ProductDetailPage from '../components/Product/ProductDetailPage'
import OrderPage from '../components/Order/OrderPage'
import ClosetPage from '../components/Closet/ClosetPage'
import DesignPage from '../components/Design/DesignPage'
import PostWritePage from '../components/Community/PostWritePage'
import CommunityPage from '../components/Community/CommunityPage'
import PostDetailPage from '../components/Community/PostDetailPage'
import NoMatch from '../components/NoMatch'
import LoginPage from '../components/Login/LoginPage'

import LoginTest from '../components/LoginTest'
import PostTester from '../components/PostTester'

const routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logintest" component={LoginTest} />
        <Route path="/hello" component={Hello} />
        <Route path="/counter" component={Counter} />  
        <Route path="/productList" component={ProductCategoryPage} /> 
        <Route path="/product" component={ProductDetailPage} /> 
        <Route path="/order" component={OrderPage} /> 
        <Route path="/closet" component={ClosetPage} /> 
        <Route path="/test" component={PostTester} /> 
        <Route path="/design" component={DesignPage} /> 
        <Route path="/community/write" component={PostWritePage}/> 
        <Route path="/community/post/" component={PostDetailPage}/> 
        <Route path="/community" component={CommunityPage}/>
        <Route component={NoMatch} />
      </Switch>
)

export default routes
