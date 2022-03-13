import { Routes, Route, NavLink } from "react-router-dom";

import Tasks from "./Tasks";

const App = () => (
  <>
    <NavLink to="/" end>
      Home
    </NavLink>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </>
);

const Home = () => <Tasks />;

export default App;
