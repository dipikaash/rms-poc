import { Outlet } from "react-router-dom";
import Header from "./Header";
const Home = () => {
    return (
        <div className="container">
            <Header/>
            <div className="body">
                <Outlet />
            </div>
        </div>
    )
}

export default Home;