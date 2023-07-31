import { Outlet,Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home =()=>{ 
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    return (
    <div className="container">
<div className="header">     
<div className="logo">
    <Link to="/"><img alt="Happiest Minds" className="classLogo" src="https://www.bing.com/th?id=OIP.Cxwp2AvIVAXsGCHrmLX_VwHaC5&w=350&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" /></Link>
    Resource Management Portal
</div>
<div className="nav-items">
<ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="aboutUs">About Us</Link></li>
    {isAuthenticated && (<li>{user.name}</li>)}
    {isAuthenticated ? (<li>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button></li>):
    (<li> 
        <button onClick={() => loginWithRedirect()}>Log In</button>     
    </li>)}

</ul>
</div>
</div>
<div className="body">
    <Outlet/>
    </div>
</div>
)}

export default Home;