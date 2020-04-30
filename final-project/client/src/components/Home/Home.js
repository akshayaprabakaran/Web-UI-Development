import React from 'react';

function App() {
  return (
    <div>
    <div class="jumbotron" style={{backgroundColor:"#fff"}}>
      <h2>The Rise Of Silicon Valley</h2>
      <p class="lead">Silicon Valley Rising is taking on occupational segregation and severe income inequality with a comprehensive campaign to raise wages, create affordable housing and build a tech economy that works for everyone.</p>
      {/* <hr class="my-4"/>
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
    </div>
    <div class="card-group">
  <div class="card">
    <img class="card-img-top center" src="jobs.png" alt="Card image cap" style={{width:"100px",height:"120px",margin:"5px auto"}}/>
    <div class="card-body">
      <h5 class="card-title">Employment</h5>
      <p class="card-text">pack up your van to join the 443,000 other people who work in Silicon Valley’s innovation sector</p>
      <a href="/employment" class="card-link">Show Stats</a>
    </div>
  </div>
  <div class="card">
  <img class="card-img-top center" src="degree.png" alt="Card image cap" style={{width:"100px",height:"120px",margin:"5px auto"}}/>
    <div class="card-body">
      <h5 class="card-title">Education</h5>
      <p class="card-text">Top Universities of the region, that play an important role into the Valley’s innovation ecosystem</p>
      <a href="/education" class="card-link">Show Stats</a>
    </div>
  </div>
  <div class="card">
  <img class="card-img-top center" src="startups.jpg" alt="Card image cap" style={{width:"100px",height:"120px",margin:"5px auto"}}/>
    <div class="card-body">
      <h5 class="card-title">Start Up</h5>
      <p class="card-text">You better keep up with the local startup scene because what happens in Silicon Valley pretty much sets the tone for the rest of the world</p>
      <a href="/startups" class="card-link">Show Stats</a>
    </div>
  </div>
</div>
    </div>
    
  );
}

export default App;