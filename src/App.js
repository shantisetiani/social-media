import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layout/Header";
import Home from "./pages/Home";
import People from "./pages/People";
import { MENU } from "./config";

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
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
