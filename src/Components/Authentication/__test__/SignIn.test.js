import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../SignIn';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

describe ('SignIn General Tests', ()=>{
    
    // Test page renders without crashing
    test ("renders without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<SignIn></SignIn>, div);
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
    test('Email type = email', ()=>{
        render(<SignIn></SignIn>);
        expect(screen.getByTestId('email-input')).toHaveAttribute("type", "email");
    })

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

    // Test invalid input to email
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
})










