import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../Register';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'
import BrowserRouter from 'react-router-dom'


import "@testing-library/jest-dom/extend-expect"

describe ('Register General Tests', ()=>{
    
    // Test page renders without crashing
    test ("renders without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<Register></Register>, div);
    })

    // Test page renders default Register state
    test("renders default state", () => {
        const { getByTestId } = render(<Register />);
        const name = getByTestId("name-field");
        const email = getByTestId("email-field");  
        const password = getByTestId("password-field");
        const accountType = getByTestId("acctype");
        const submit = getByTestId("submit-button");
        
        expect(name.value).toBe("");
        expect(email.value).toBe("");
        expect(password.value).toBe("");
        expect(accountType.value).toBeUndefined;
        expect(submit).toHaveStyle({
            marginTop: 3,
            marginBottom: 2,
        })
    })
    

    // test presence of correct welcome text
    test('has correct welcome text', () => {
        render(<Register></Register>);
        expect(screen.getByTestId('signup-header')).toHaveTextContent('Register for VCC');
    })
})

describe ('SignUp Email Tests', ()=>{
    
    // Test email input field exists
    test('Email input exists', ()=>{
        render(<Register></Register>);
        expect(screen.getByTestId('email-field')).toBeInTheDocument();
    })

    // Test email attribute type
    test('Email type = text', ()=>{
        render(<Register></Register>);
        expect(screen.getByTestId('email-field')).toHaveAttribute("type", "text");
    })

    // Test email initial value
    test('Email input initialized empty', ()=>{
        render(<Register></Register>);
        expect(screen.getByTestId('email-field')).toHaveValue('');
    })

    // Test valid email as input
    test('pass valid email to test email input field', ()=>{
        render(<Register></Register>)
        const inputEl = screen.getByTestId("email-field");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    })

    // Test valid input to email 2
    test('pass valid email to test email input field pt2', ()=>{
        render(<Register></Register>)
        const inputEl = screen.getByTestId("email-field");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).not.toHaveValue("testNOT@mail.com");
    })

    // Test invalid input to email
    test('pass invalid email to test input value', ()=>{
        render(<Register></Register>)
        const inputEl = screen.getByTestId("email-field");
        userEvent.type(inputEl, "test");
    
        expect(screen.getByTestId("email-field")).toHaveValue("test");
        expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    })
    
})

describe ('SignUp Password Tests', ()=>{

    // Test password input field exists
    test('Password input exists', () => {
        render(<Register></Register>);
        expect(screen.getByTestId('password-field')).toBeInTheDocument();
    })
})

describe ('Register Submit Tests', ()=>{

    // Test submit button exists
    test('Register submit exists', () => {
        render(<Register></Register>);
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    })

    // Tests submit button enabled
    it("enables submit when form is filled out", () => {
        const { getByTestId } = render(<Register />);
        const password = getByTestId("password-field");
        const email = getByTestId("email-field");
        const submit = getByTestId("submit-button");
        expect(submit).not.toHaveClass("Mui-disabled");
    });
})

test('Copyright link goes to website', () => {
    render(<Register></Register>);
    expect(screen.getByText('VCC')).toHaveAttribute('href', 'https://anchorlink.vanderbilt.edu/organization/cricketclub');

})

describe ('SignUp Radio Button Admin/Player Tests', () => {
    test ("click button and change state", ()=>{ 
        render(<Register></Register>);
        const buttonEl = screen.getByTestId("adminChoice");
        expect(buttonEl).not.toBeChecked;
        userEvent.click(buttonEl);
        expect(buttonEl).toBeChecked;
    })
})

