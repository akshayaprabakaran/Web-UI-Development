import React from 'react';
import Landing from "./components/Landing/Navbar";
import Employment from "./components/Employment/Charts";
import Education from "./components/Education/Charts";
import StartUps from "./components/Startups/Charts";
import Home from "./components/Home/Home";
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Route path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/employment" component={Employment} />
          <Route path="/startups" component={StartUps} />
          <Route path="/education" component={Education} />
        </div>
      </div>
    </Router>
  );
}

export default App;
