import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../SignIn';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

// global.window = { location: { pathname: null } };

describe ('SignIn General Tests', ()=>{
    
    // Test page renders without crashing
    test ("renders without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<SignIn></SignIn>, div);
        
        // expect(global.window.location.pathname).toEqual('/signIn');
    })

    // Test page renders default SignIn state
    test("renders default state", () => {
        const { getByTestId } = render(<SignIn />);
        const password = getByTestId("password-field");
        const email = getByTestId("email-input");  
        const submit = getByTestId("signin-submit");
        
        expect(password.value).toBe("");
        expect(email.value).toBe("");
        expect(submit).toHaveStyle({
            marginTop: 3,
            marginBottom: 2,
        })
    })   

    // test presence of correct welcome text
    test('has correct welcome text', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('login header')).toHaveTextContent('Log In to VCC');
    })


})

describe ('SignIn Email Tests', ()=>{
    
    // Test email input field exists
    test('Email input exists', ()=>{
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
    })

    // Test email attribute type
    // test('Email type = email', ()=>{
    //     render(<SignIn></SignIn>);
    //     expect(screen.getByTestId('email-input')).toHaveAttribute("type", "email");
    // })

    // Test email initial value
    test('Email input initialized empty', ()=>{
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('email-input')).toHaveValue('');
    })

    // Test valid email as input
    test('pass valid email to test email input field', ()=>{
        render(<SignIn></SignIn>)
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    })

    // Test valid input to email 2
    test('pass valid email to test email input field pt2', ()=>{
        render(<SignIn></SignIn>)
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).not.toHaveValue("testNOT@mail.com");
    })

    // Test ininvalid input to email
    test('pass invalid email to test input value', ()=>{
        render(<SignIn></SignIn>)
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test");
    
        expect(screen.getByTestId("email-input")).toHaveValue("test");
        expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    })
    
})

describe ('SignIn Password Tests', ()=>{

    // Test password input field exists
    test('Password input exists', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('password-field')).toBeInTheDocument();
    })

    // Test password initial value
    test('Email password initialized empty', ()=>{
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('password-field')).toHaveValue('');
    })

     // Test valid password as input
     test('pass valid password to test password input field', ()=>{
        render(<SignIn></SignIn>)
        const inputEl = screen.getByTestId("password-field");
        userEvent.type(inputEl, "password123");
        expect(inputEl).toHaveValue("password123");
    })

    // Test valid input to password 2
    test('pass valid password to test password input field pt2', ()=>{
        render(<SignIn></SignIn>)
        const inputEl = screen.getByTestId("password-field");
        userEvent.type(inputEl, "password123");
        expect(inputEl).not.toHaveValue("NOTpassword123");
    })
})

describe ('SignIn Submit Tests', ()=>{

    // Test submit button exists
    test('SignIn submit exists', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('signin-submit')).toBeInTheDocument();
    })

    // Tests submit button enabled
    it("enables submit when form is filled out", () => {
        const { getByTestId } = render(<SignIn />);
        const password = getByTestId("password-field");
        const email = getByTestId("email-input");
        const submit = getByTestId("signin-submit");
        expect(submit).not.toHaveClass("Mui-disabled");
    });

    // Test submit button type
    test('SignIn submit type', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('signin-submit')).toHaveAttribute("type", "submit");
    })

    // Test submit button update variable values
    test('SignIn submit button', () => {
        render(<SignIn></SignIn>);
        const buttonEl = screen.getByTestId("signin-submit");
        userEvent.click(buttonEl);
        // expect(screen.getByTestId('signin-submit')).toHaveAttribute("type", "submit");
    })

})

describe ('SignIn Forgot Password Tests', ()=>{
    
    // Test forgot password link exists
    test('SignIn forgot password exists', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('forgot-password')).toBeInTheDocument();
    })

    // Test forgot password directs to forgot password page
    test('SignIn forgot password directs to forgot password page', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('forgot-password')).toHaveAttribute('href',"/passwordReset");

        const linkEl = screen.getByTestId("forgot-password");
        userEvent.click(linkEl);
        // expect(global.window.location.pathname).toEqual('/passwordReset');
    })

})

describe ('SignIn Sign Up Tests', ()=>{
    // Test  Sign Up link exists
    test('SignIn Sign Up exists', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('sign-up')).toBeInTheDocument();
    })

    // Test sign up directs to sign up page
    test('SignIn  Sign Up directs to  Sign Up page', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('sign-up')).toHaveAttribute('href',"/signUp");

        const linkEl = screen.getByTestId("sign-up");
        userEvent.click(linkEl);
    })    
})

describe ('Signin VCC Tests', ()=>{

    // Test VCC Link exists
    test('SignIn VCC Link exists', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByText('VCC')).toBeInTheDocument();
    })

    // Test VCC Link directs properly
    test('SignIn VCC link directs', () => {
        render(<SignIn></SignIn>);
        expect(screen.getByText('VCC')).toHaveAttribute('href', "https://anchorlink.vanderbilt.edu/organization/cricketclub")
    })
})









