import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

import SignIn from '../src/Components/Authentication/SignIn'



// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test ("renders without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<SignIn></SignIn>, div);
})
