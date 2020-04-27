import React from 'react';
import Landing from "./components/Landing/Navbar";
import JobGrowth from "./components/JobGrowth/Charts";
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Route path="/" component={Landing} />
          <Route path="/jobgrowth" component={JobGrowth} />
        </div>
      </div>
    </Router>
  );
}

export default App;
