import React, {
  lazy,
  Suspense,
  createContext,
  useState,
  useEffect,
} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layout/Header";
import Home from "./pages/Home";
import { MENU } from "./config";
import { setIsLogin } from "./redux";

const People = lazy(() => import("./pages/People"));
const Profile = lazy(() => import("./pages/Profile"));
const AllPost = lazy(() => import("./pages/AllPost"));
const PostDetail = lazy(() => import("./pages/post/PostDetail"));
const AlbumDetail = lazy(() => import("./pages/album/AlbumDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const LoginContext = createContext({
  isLogin: false,
  login: () => {},
  logout: () => {},
  loginInfo: {},
});

function App() {
  const [loginState, setLoginState] = useState({});

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login);

  useEffect(() => {
    setLoginState({
      isLogin: isLogin,
      login: () => dispatch(setIsLogin(true)),
      logout: () => dispatch(setIsLogin(false)),
      loginInfo: {
        id: 99,
        name: "Super Admin",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Jl. Raya",
          suite: "Apt. 112",
          city: "Jakarta",
          zipcode: "17353",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "0879345945454",
        website: "sally.org",
        company: {
          name: "Kumparan",
          catchPhrase: "Some catch phrase",
          bs: "-",
        },
      },
    });
  }, [isLogin, dispatch]);

  return (
    <LoginContext.Provider value={loginState}>
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
            <Route exact path={MENU.POST} component={AllPost} />
            <Route exact path={`${MENU.POST}/:id`} component={PostDetail} />
            <Route exact path={`${MENU.ALBUM}/:id`} component={AlbumDetail} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
