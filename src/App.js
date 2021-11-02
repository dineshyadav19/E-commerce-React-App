import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./routes/Home"
import LoginPage from "./routes/LoginPage";
import SignUp from "./routes/SignUp"

function App() {
  return (
    <Router>
       <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/login"><LoginPage /></Route>
          <Route exact path="/signup"><SignUp /></Route>
       </Switch>
    </Router>
  );
}

export default App;
