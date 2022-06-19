import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { addToken, isAuth, selectAuth } from "./features/authSpotifySlice";
import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
const reqToken = JSON.parse(sessionStorage.getItem("clonify-req-token"));

function App() {
  const isUserAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  if (reqToken?.access_token && !isUserAuth) {
    //dentro de un useEffect tendré problemas al cambiar el Path de la URL /search /library /
    console.log("accestoken-local & !isUserAuth");
    dispatch(addToken(reqToken));
    dispatch(isAuth(true));
  }
  // useEffect(() => {
  //   const reqToken = JSON.parse(sessionStorage.getItem("clonify-req-token"));
  //   console.log("effect");
  //   if (reqToken?.access_token) {
  //     console.log("accestoken-local");
  //     dispatch(addToken(reqToken));
  //     dispatch(isAuth(true));
  //   }
  // }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="library"
            element={
              <PrivateRoute>
                <Library />
              </PrivateRoute>
            }
          />
          <Route
            path="search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
