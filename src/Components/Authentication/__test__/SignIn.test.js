import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../SignIn';
import userEvent from '@testing-library/user-event'
import {render, screen, cleanup} from '@testing-library/react'


test ("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div);
})

// test ("has correct login text", ()=>{

//     render(<SignIn email="test@gmail.com" password="testpass" />)
//     expect(screen.getByRole('Email Address')).toHaveValue("")

// })


// test presence of correct welcome text
test('has correct welcome text', () => {
    render(<SignIn></SignIn>)
    expect(screen.getByTestId('login header')).toHaveTextContent('Log In to VCC')
  })
