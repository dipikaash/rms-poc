import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from 'react';


export function getUser() {
    let user = localStorage.getItem('user');
    if (user)
        user = JSON.parse(user);
    else
        user = null;
    return user;
}
const Home = () => {
    const [user] = useState(getUser());
    return (<>
        {user ?
            (<div className="container">
                <Header />
                <div className="body">
                    <Outlet />
                </div>
            </div>) : (
                <Navigate to="/" />
                )}
    </>
    )
}

export default Home;