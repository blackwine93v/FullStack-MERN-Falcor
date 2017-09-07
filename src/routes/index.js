import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../layouts/CoreLayout";
import PublishingApp from "../layouts/PublishingApp";
import LoginView from "../views/LoginView";
import DashboardView from "../views/DashboardView";

export default (
  <Route component={CoreLayout} path="/">
    <IndexRoute component={PublishingApp} name="home" />
    <Route component={LoginView} path="login" name="login" />
    <Route component={DashboardView} path="dashboard" name="dashboard" />
  </Route>
);
