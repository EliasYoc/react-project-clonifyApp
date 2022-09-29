import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { addToken, isAuth, selectAuth } from "./features/authSpotifySlice";
import Home from "./pages/Home/Home";
import LibraryAlbums from "./pages/Library/components/LibraryAlbums";
import LibraryArtists from "./pages/Library/components/LibraryArtists";
import LibraryPlaylists from "./pages/Library/components/LibraryPlaylists";
import LibraryPodcasts from "./pages/Library/components/LibraryPodcasts";
import Library from "./pages/Library/Library";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Podcast from "./pages/Podcast/Podcast";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
import Artist from "./pages/Artist/Artist";
const reqToken = JSON.parse(sessionStorage.getItem("clonify-req-token"));

function App() {
  const isUserAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  if (reqToken?.access_token && !isUserAuth) {
    //dentro de un useEffect tendré problemas al cambiar el Path de la URL /search /library /
    dispatch(addToken(reqToken));
    dispatch(isAuth(true));
  }

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
            path="playlist/:id"
            element={
              <PrivateRoute>
                <p>Playlist</p>
              </PrivateRoute>
            }
          />
          <Route
            path="album/:albumId"
            element={
              <PrivateRoute>
                <p>Album</p>
              </PrivateRoute>
            }
          />
          <Route
            path="show/:showId"
            element={
              <PrivateRoute>
                <Podcast />
              </PrivateRoute>
            }
          />

          <Route
            path="artist/:artistId"
            element={
              <PrivateRoute>
                <Artist />
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
          >
            <Route path="playlists" element={<LibraryPlaylists />} />
            <Route path="podcasts" element={<LibraryPodcasts />} />
            <Route path="artistas" element={<LibraryArtists />} />
            <Route path="albumes" element={<LibraryAlbums />} />
          </Route>
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
