import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Something for pages</p>
              </Layout>
            }
          >
            Home Page
          </Route>
          <Route
            path="/search"
            element={
              <Layout>
                <p>Something for search</p>
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

//based on the path, we are passing different components inside the layout

export default App;

