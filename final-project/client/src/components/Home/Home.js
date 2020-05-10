import React from 'react';

function App() {
  return (
    <div>
    <div class="jumbotron" style={{backgroundColor:"#365253"}}>
      <h1 style={{color:"#ffffff",textAlign:"center",fontWeight:"bold",fontSize:"150px"}}>Rise of Silicon Valley</h1>
      <p style={{color:"#ffffff",textAlign:"center",fontSize:"30px"}} class="lead">"Silicon Valley is a Mindset not a Location" - Reid Hoffman</p>
      {/* <hr class="my-4"/>
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
    </div>
    <div class="card-group">
  <div class="card">
    <img class="card-img-top center" src="promotion.png" alt="Card image cap" style={{width:"100px",height:"120px",margin:"5px auto"}}/>
    <div class="card-body">
      <h5 class="card-title" style={{color:"#365253",fontSize:"30px",textAlign:"center"}}>Employment</h5>
      <p style={{fontSize:"19px",textAlign:"center"}} class="card-text">Pack up your van to join the other techies working in Silicon Valley’s innovation sector</p>
      <a href="/employment" class="card-link">Show Stats</a>
    </div>
  </div>
  <div class="card">
  <img class="card-img-top center" src="graduation-hat-and-diploma.png" alt="Card image cap" style={{width:"100px",height:"120px",margin:"5px auto"}}/>
    <div class="card-body">
      <h5 class="card-title" style={{color:"#365253",fontSize:"30px",textAlign:"center"}}>Education</h5>
      <p style={{fontSize:"19px",textAlign:"center"}} class="card-text">Graduation and educational growths that play an important role into the Valley’s innovation ecosystem</p>
      <a href="/education" class="card-link">Show Stats</a>
    </div>
  </div>
  <div class="card">
  <img class="card-img-top center" src="transport.png" alt="Card image cap" style={{width:"100px",height:"120px",margin:"5px auto"}}/>
    <div class="card-body">
      <h5 class="card-title" style={{color:"#365253",fontSize:"30px",textAlign:"center"}}>Startups</h5>
      <p style={{fontSize:"19px",textAlign:"center"}} class="card-text">Silicon Valley's startups pretty much set the tone for the rest of the world</p>
      <a style={{textAlign:"center"}} href="/startups" class="card-link" >Show Stats</a>
    </div>
  </div>
</div>
    </div>
    
  );
}

export default App;