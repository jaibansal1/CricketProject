import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../SignUp';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

describe ('SignUp General Tests', ()=>{
    
    // Test page renders without crashing
    test ("renders without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<SignUp></SignUp>, div);
    })

    // Test page renders default SignUp state
    test("renders default state", () => {
        const { getByTestId } = render(<SignUp />);
        const firstName = getByTestId("fname-field");
        const lastName = getByTestId("lname-field");
        const email = getByTestId("email-field");  
        const password = getByTestId("password-field");
        const accountType = getByTestId("acctype");
        const submit = getByTestId("submit-button");
        
        expect(firstName.value).toBe("");
        expect(lastName.value).toBe("");
        expect(email.value).toBe("");
        expect(password.value).toBe("");
        //expect(accountType.value).toBe("");
        expect(submit).toHaveStyle({
            marginTop: 3,
            marginBottom: 2,
        })
    })
    

    // test presence of correct welcome text
    test('has correct welcome text', () => {
        render(<SignUp></SignUp>);
        expect(screen.getByTestId('signup-header')).toHaveTextContent('Sign Up for VCC');
    })
})

describe ('SignUp Email Tests', ()=>{
    
    // Test email input field exists
    test('Email input exists', ()=>{
        render(<SignUp></SignUp>);
        expect(screen.getByTestId('email-field')).toBeInTheDocument();
    })

    // Test email attribute type
    test('Email type = text', ()=>{
        render(<SignUp></SignUp>);
        expect(screen.getByTestId('email-field')).toHaveAttribute("type", "text");
    })

    // Test email initial value
    test('Email input initialized empty', ()=>{
        render(<SignUp></SignUp>);
        expect(screen.getByTestId('email-field')).toHaveValue('');
    })

    // Test valid email as input
    test('pass valid email to test email input field', ()=>{
        render(<SignUp></SignUp>)
        const inputEl = screen.getByTestId("email-field");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    })

    // Test valid input to email 2
    test('pass valid email to test email input field pt2', ()=>{
        render(<SignUp></SignUp>)
        const inputEl = screen.getByTestId("email-field");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).not.toHaveValue("testNOT@mail.com");
    })

    // Test invalid input to email
    test('pass invalid email to test input value', ()=>{
        render(<SignUp></SignUp>)
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
        render(<SignUp></SignUp>);
        expect(screen.getByTestId('password-field')).toBeInTheDocument();
    })
})

describe ('SignUp Submit Tests', ()=>{

    // Test submit button exists
    test('SignUp submit exists', () => {
        render(<SignUp></SignUp>);
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    })

    // Tests submit button enabled
    it("enables submit when form is filled out", () => {
        const { getByTestId } = render(<SignUp />);
        const password = getByTestId("password-field");
        const email = getByTestId("email-field");
        const submit = getByTestId("submit-button");
        expect(submit).not.toHaveClass("Mui-disabled");
    });
})


test('Copyright link goes to website', () => {
    render(<SignUp></SignUp>);
    expect(screen.getByText('VCC')).toHaveAttribute('href', 'https://anchorlink.vanderbilt.edu/organization/cricketclub');

})


