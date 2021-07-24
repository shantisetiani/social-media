import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layout/Header";
import Home from "./pages/Home";

const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
