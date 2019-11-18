import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Tasks from "./containers/Tasks/Tasks";
import NewTask from "./containers/NewTask/NewTask";
import Login from "./containers/Login/Login";
import EditTask from "./containers/EditTask/EditTask";

const ProtectedRoute = props => {
    return props.isAllowed ? <Route {...props} /> : <Redirect to='/' />
}



const Routes = ({ user }) => {
  return (
    <Switch>
      <Route path="/" exact component={Tasks} />
      <Route path="/tasks/new" component={NewTask} />
      <Route path="/login" component={Login} />
        <ProtectedRoute
            path='/edit/:id'
            component={EditTask}
            isAllowed={user && user.name === 'admin'}
        />
    </Switch>
  );
};

export default Routes;
