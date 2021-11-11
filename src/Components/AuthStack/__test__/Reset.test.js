import React from 'react';
import ReactDOM from 'react-dom';
import Reset from '../Reset';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

describe ('Reset General Tests', ()=>{

    // Test page renders without crashing
    test ("renders without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<Reset></Reset>, div);
    })

    // Test page renders default SignIn state
    test("renders default state", () => {
        const { getByTestId } = render(<Reset />);
        const email = getByTestId("email-input");  
        const submit = getByTestId("reset-submit");
        
        expect(email.value).toBe("");
        expect(email.value).toBe("");
        expect(submit).toHaveStyle({
            marginTop: 3,
            marginBottom: 2,
        })
    })
    
    // test presence of correct heading text
    test('has correct heading text', () => {
        render(<Reset></Reset>);
        expect(screen.getByTestId('reset-header')).toHaveTextContent('Forgot Password?');
    })

    // test presence of correct subheading text
    test('has correct subheading text', () => {
        render(<Reset></Reset>);
        expect(screen.getByTestId('reset-subheader')).toHaveTextContent('Enter your email below');
    })
})

describe ('SignIn Email Tests', ()=>{
    
    // Test email input field exists
    test('Email input exists', ()=>{
        render(<Reset></Reset>);
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
    })

    // Test email attribute type
    test('Email type = text', ()=>{
        render(<Reset></Reset>);
        expect(screen.getByTestId('email-input')).toHaveAttribute("type", "text");
    })

    // Test email initial value
    test('Email input initialized empty', ()=>{
        render(<Reset></Reset>);
        expect(screen.getByTestId('email-input')).toHaveValue('');
    })

    // Test valid email as input
    test('pass valid email to test email input field', ()=>{
        render(<Reset></Reset>)
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    })

    // Test valid input to email 2
    test('pass valid email to test email input field pt2', ()=>{
        render(<Reset></Reset>)
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(inputEl).not.toHaveValue("testNOT@mail.com");
    })

    // Test invalid input to email
    test('pass invalid email to test input value', ()=>{
        render(<Reset></Reset>)
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test");
    
        expect(screen.getByTestId("email-input")).toHaveValue("test");
        expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    })
    
})

describe ('Reset Submit Tests', ()=>{

    // Test submit button exists
    test('SignIn submit exists', () => {
        render(<Reset></Reset>);
        expect(screen.getByTestId('reset-submit')).toBeInTheDocument();
    })

    // Tests submit button enabled
    it("enables submit when form is filled out", () => {
        const { getByTestId } = render(<Reset />);
        const email = getByTestId("email-input");
        const submit = getByTestId("reset-submit");
        expect(submit).not.toHaveClass("Mui-disabled");
    });
})