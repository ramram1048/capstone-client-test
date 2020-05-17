import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import ProductCategoryPage from '../components/Product/ProductCategoryPage'
import ProductDetailPage from '../components/Product/ProductDetailPage'

import OrderPlacePage from '../components/Order/OrderPlacePage'
import OrderMypage from '../components/Order/OrderMypage'

import ClosetPage from '../components/Closet/ClosetPage'

// designs
import DesignRecentPage from '../components/Design/DesignRecentPage'
import DesignBestPage from '../components/Design/DesignBestPage'
import DesignMypage from '../components/Design/DesignMypage'
import DesignLikepage from '../components/Design/DesignLikepage'
import DesignFollowPage from '../components/Design/DesignFollowPage'
import DesignHashtagSearchPage from '../components/Design/DesignHashtagSearchPage'

import PostWritePage from '../components/Community/PostWritePage'
import CommunityPage from '../components/Community/CommunityPage'
import PostDetailPage from '../components/Community/PostDetailPage'
import NoMatch from '../components/NoMatch'
// import LoginPage from '../components/Login/LoginPage'
// import AuthPage from '../components/Auth/AuthPage'

// import LoginTest from '../components/LoginTest'
// import PostTester from '../components/PostTester'

const routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/login" component={LoginPage} />
        <Route path="/logintest" component={LoginTest} /> */}
        {/* <Route path="/auth" component={AuthPage} /> */}
        <Route path="/hello" component={Hello} />
        <Route path="/counter" component={Counter} />  
        <Route path="/productList" component={ProductCategoryPage} /> 
        <Route path="/product" component={ProductDetailPage} /> 

        <Route path="/order/placeorder" component={OrderPlacePage} /> 
        <Route path="/order/myorder" component={OrderMypage} /> 

        <Route path="/closet" component={ClosetPage} /> 
        {/* <Route path="/test" component={PostTester} />  */}

        <Route path="/design/recent" component={DesignRecentPage} /> 
        <Route path="/design/best" component={DesignBestPage} /> 
        <Route path="/design/mydesign" component={DesignMypage} /> 
        <Route path="/design/like" component={DesignLikepage} />
        <Route path="/design/follow" component={DesignFollowPage} /> 
        <Route path="/design/hashtag" component={DesignHashtagSearchPage} /> 
        <Route path="/design/" component={DesignBestPage} /> 

        <Route path="/community/write" component={PostWritePage}/> 
        <Route path="/community/post/" component={PostDetailPage}/> 
        <Route path="/community" component={CommunityPage}/>
        <Route component={NoMatch} />
      </Switch>
)

export default routes
