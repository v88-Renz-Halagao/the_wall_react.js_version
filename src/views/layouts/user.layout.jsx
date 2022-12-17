/* React */
import React, { Component } from                        "react";
import { BrowserRouter as Router, Routes, Route } from  "react-router-dom"

/* Pages */
import Login from "../user/login/login";
import Signup from "../user/signup/signup";
import Wall from "../user/wall/wall";

class UserLayout extends Component {
    render() { 
        return (
            <React.Fragment>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/wall" element={<Wall />} />
                    </Routes>
                </Router>
            </React.Fragment>
        );
    }
}
 
export default UserLayout;
