/* React */
import React, { Component }         from "react";
import { Link }                     from  "react-router-dom";
/* CSS */
import "./login.scss";
/* Images */
import Image_for_right_container from "../../../assets/images/Group_2018.png";

/** 
* @class 
* @extends Component
* This component class is being called on the /layouts/user.layout.jsx <br>
* This is class component is responsible for Login page. <br>
* Last Updated Date: December 20, 2022
*/
class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            login_error: null,
            login_input: {
                email: null,
                password: null
            },
            login_data: {
                email: "test@gmail.com",
                password: "12345"
            } 
        }
    }

    /**
    * DOCU: This function will handle the input change, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Login page
    * @param {object} input - Require input value
    * @author Renz
    */
    handleInputChange = (input) => {
        this.setState({
            login_input: {
                ...this.state.login_input,
                [input.name]: input.value,
            },
        })
    }

    /**
    * DOCU: This function will validate and submits login form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Login page
    * @param {object} event - Require form event.
    * @author Renz
    */
    handleOnLoginSubmit = (event) => {
        event.preventDefault();
        let {login_input, login_data} = this.state; 
        if(login_input.email !== login_data.email || login_input.password !== login_data.password){
            this.setState({
                login_error: true
            });
        } 
        else{
            window.location.href="/wall";
        }
    }

    render() {
        let {login_error} = this.state;
        return (
            <section>
                <div id="form_container">
                    <form autoComplete="off" method="post" id="form_sign_in" onSubmit={this.handleOnLoginSubmit}>
                        <h2>The Wall</h2>
                        <h3>Log In</h3>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${ (login_error) && "input_error" }`}
                            onChange={(event) => this.handleInputChange(event.target)}
                            required/>
                        {(login_error) &&
                            <span className="error">Incorrrect Email</span>
                        }
                        <label htmlFor="password">Password</label>
                        <Link to="#" tabIndex="-1">Forget Passoword ?</Link>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${ (login_error) && "input_error" }`}
                            onChange={(event) => this.handleInputChange(event.target)}
                            required/>
                        {(login_error) &&
                            <span className="error">Incorrrect Password</span> 
                        }
                        <button type="submit">SIGN IN</button>
                        <p>I don't have an account ? <Link to="/signup" >Sign up</Link></p>
                    </form>
                </div>
                <div id="right_container">
                    <img src={Image_for_right_container} alt="A man holdin a form" />
                </div>
            </section>
        );
    }
}
 
export default Login;
