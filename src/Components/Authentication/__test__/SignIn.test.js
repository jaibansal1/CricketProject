import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../SignIn';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

// Test page renders without crashing
test ("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div);
})

// Test page renders default SignIn state
test("renders default state", () => {
    const { getByTestId } = render(<SignIn />);
    const password = getByTestId("password-field");
    const email = getByTestId("email-field");  
    const submit = getByTestId("signin-submit");
    
    expect(password.value).toBe("");
    expect(email.value).toBe("");
    expect(submit).toHaveStyle({
        marginTop: 3,
        marginBottom: 2,
      })

})   

// Test presence of correct welcome text
test('Displays welcome text', () => {
    render(<SignIn></SignIn>)
    expect(screen.getByTestId('login header')).toHaveTextContent('Log In to VCC')
  })


// Test email input field exists
test('Email input exists', () => {
    render(<SignIn></SignIn>);
    expect(screen.getByTestId('email-field')).toBeInTheDocument();
})

// Test password input field exists
test('Password input exists', () => {
    render(<SignIn></SignIn>);
    expect(screen.getByTestId('password-field')).toBeInTheDocument();
})

// Test submit button exists
test('SignIn submit exists', () => {
    render(<SignIn></SignIn>);
    expect(screen.getByTestId('signin-submit')).toBeInTheDocument();
})

// Test submit button exists
test('SignIn submit exists', () => {
    render(<SignIn></SignIn>);
    expect(screen.getByTestId('signin-submit')).toBeInTheDocument();
})

it("enables submit when form is filled out", () => {
    const { getByTestId } = render(<SignIn />);
    const password = getByTestId("password-field");
    const email = getByTestId("email-field");
    const submit = getByTestId("signin-submit");
    expect(submit).not.toHaveClass("Mui-disabled");

});
    



    


