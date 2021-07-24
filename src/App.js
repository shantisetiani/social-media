import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layout/Header";
import Home from "./pages/Home";
import { MENU } from "./config";

const People = lazy(() => import("./pages/People"));
const Profile = lazy(() => import("./pages/Profile"));
const PostDetail = lazy(() => import("./pages/post/PostDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={MENU.HOME} component={Home} />
            <Route exact path={MENU.PEOPLE} component={People} />
            <Route
              exact
              path={`${MENU.PEOPLE}/:id/profile`}
              component={Profile}
            />
            <Route exact path={`${MENU.POST}/:id`} component={PostDetail} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
