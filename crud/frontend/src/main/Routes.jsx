import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Todo from '../components/todo/Todo'

export default props =>

    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={UserCrud}/>
        <Route path='/todo' component={Todo}/>
        <Redirect from='*' to='/'/>
    </Switch>