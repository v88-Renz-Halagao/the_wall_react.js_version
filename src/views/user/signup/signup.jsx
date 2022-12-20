/* React */
import React, { Component } from "react";
import { Link } from  "react-router-dom";

/* Prototype Data */
import { regex } from "./email_format_prototype_data";

/* CSS */
import "./signup.scss";

/* Images */
import Image_for_right_container from "../../../assets/images/Group_2018.png";

/** 
* @class 
* @extends Component
* This component class is being called on the /layouts/user.layout.jsx <br>
* This is class component is responsible for Signup page. <br>
* Last Updated Date: December 20, 2022
*/
class Signup extends Component {
    constructor(props){
        super(props)

        this.state = {
            email_format: regex,
            signup_error: {
                email: null,
                password: null,
                confirm_password: null,
            },
            signup_input: {
                email: null,
                password: null,
                confirm_password: null,
            } 
        }
    } 

    /**
    * DOCU: This function will handle the input change, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Signup page
    * @param {object} input ="" - Require input value
    * @author Renz
    */
    handleInputChange = (input) => {
        this.setState({
            signup_input: {
                ...this.state.signup_input,
                [input.name]: input.value,
            },
        })
    }

    /**
    * DOCU: This function will handle the input errors, updates the state's value <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Signup page
    * @param {string} input_name - Require input name
    * @param {string} input_error - Require input error
    * @author Renz
    */
    handleInputError = (input_name, input_error) => {
        this.setState(prevState => ({
            signup_error: {
                ...prevState.signup_error,
                [input_name]: input_error, 
            },
        }));
    }

    /**
    * DOCU: This function will validate the inputs has still errors. <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Signup page
    * @author Renz
    */
    validateSignUp = () => {
        let error = this.state.signup_error;
        if (error.email === null && error.password === null && error.confirm_password === null) {
            window.location.href="/wall";
        }
    } 

    /**
    * DOCU: This function will validate and submits signup form <br>
    * Triggered: render() <br>
    * Last Updated Date: December 20, 2022
    * @function
    * @memberOf Signup page
    * @param {object} event - Require form event.
    * @author Renz
    */
    /* NEED TO REDO THIS */
    handleOnSignupSubmit = (event) => {
        event.preventDefault();
        let {email_format, signup_input} = this.state;

        if(!email_format.test(String(signup_input.email).toLowerCase())){
            this.handleInputError("email", "Email is Invalid");
        }
        else{
            this.handleInputError("email", null);
            this.validateSignUp();
        } 

        if(signup_input.password !== signup_input.confirm_password){
            this.handleInputError("confirm_password", "Passwords does not match");
        }
        else{
            this.handleInputError("confirm_password", null);
            this.validateSignUp();
        }
    }

    render() {
        let {signup_error} = this.state;
        return (
            <section>
                <div id="form_container">
                    <form autoComplete="off" method="post" id="form_sign_up" onSubmit={this.handleOnSignupSubmit}>
                        <h2>The Wall</h2>
                        <h3>Register</h3>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            className={`form-control ${ (signup_error.email) ? "input_error" : "" }`}
                            onChange={(event) => this.handleInputChange(event.target)}
                            required/>
                        {(signup_error.email) &&
                            <span className="error">{signup_error.email}</span>
                        }
                        <label htmlFor="password">Password</label> 
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${ (signup_error.password) ? "input_error" : "" }`}
                            onChange={(event) => this.handleInputChange(event.target)}
                            required/>
                        {(signup_error.password) &&
                            <span className="error">{signup_error.password}</span>
                        }
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input 
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className={`form-control ${ (signup_error.confirm_password) ? "input_error" : "" }`}
                            onChange={(event) => this.handleInputChange(event.target)}
                            required/>
                        {(signup_error.confirm_password) &&
                            <span className="error">{signup_error.confirm_password}</span>
                        }
                        <p id="agreement_info">By creating an account, you agree with The Wall's <Link to="#">Privacy Policy</Link> and <Link to="#">Terms of Use</Link>. </p>
                        <button type="submit">SIGN UP</button>  
                        <p>Already have an account ?  <Link to="/" >Sign In</Link></p> 
                    </form>
                </div>
                <div id="right_container">
                    <img src={Image_for_right_container} alt="A man holdin a form" />
                </div>
            </section>
        );
    }
}
 
export default Signup;
