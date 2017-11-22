// This is a Jest file for testing the App Component

import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';

// shallow function takes in JSX as an argument and returns an object that represents the JSX component in the react testing environment
// the app variable stores this object
const app = shallow(<App />);

// for the globsl 'it' function, the first parameter (called a shrink) describes the test, the second is a function that actually runs the test
it('renders correctly', () => {
  expect(app).toMatchSnapshot();
});
// not sure if following test will work with redux router, might need to be refactored
it('contains a connected Accounts component', () => {
	// an enzyme trick when trying to check rendering of containers, rather than basic componenets
	// console.log(app.debug());
	expect(app.find('Connect(Accounts)').exist()).toBe(true);
}) ;
