import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";

function App() {
  return (
    <>
      <Router>
        <Link to="/questions">
          <header className="App-header">Pedenko React Homework</header>
        </Link>
        <Switch>
          <Route exact path="/questions">
            <Home />
          </Route>

          <Route exact path="/questions/:id">
            <Question />
          </Route>

          <Route path="/newquestion">
            <NewQuestion />
          </Route>

          <Redirect from="*" to="/questions" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
