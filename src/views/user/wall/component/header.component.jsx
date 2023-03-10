/* React */
import React, { Component } from    "react";
import { Link } from                "react-router-dom";

/* Plugins */
import Navbar from "react-bootstrap/Navbar";

/* CSS */
import "./header.component.scss";

/** 
* @class 
* @extends Component
* This component class is being called on the /Wall.jsx <br>
* This component will show the header.<br>
* Last Updated Date: December 20, 2022
*/
class Wall extends Component {
    render() { 
        return (
            <header>
                <Navbar>
                    <h1><Link to="/wall">The Wall Assignment</Link></h1>
                    <span>Welcome, Renz Halagao</span> 
                    <Link to="/">Logout</Link>
                </Navbar>
            </header>
        );
    }
}
 
export default Wall;