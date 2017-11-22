// This is a Jest file for testing the App Component

import React from 'react';
import { shallow } from 'enzyme';
import Accounts from '../client/src/container/Accounts';


describe( 'Accounts', () => {
	const mockDeposit = jest.fn();
	const props = { accounts: [ { balance: 20, deposit: mockDeposit } ] }

	const accounts = shallow(<Accounts />);

	it('renders properly', () => {
		expect(accounts).toMatchSnapshot();
	}); 

	it('displays the accounts from props', () => {
		expect(accounts.find(/*string representing element or class or whateverto find on shallow render of DOM*/).text()).toEqual(/* .text is just an exampl, find whatever is appropriate*/);
	});

	// checks for a particular element in the  shallow render
	it('creates an input to deposit into or withdraw from the balance', () => {
		expect(accounts.find('.input-wallet').exists()).toBe(true);
	});

	describe('when the user types into the wallet input', () => {
		const userBalance = '25';

		beforeEach(() => {
			/*
			 a change to an input fires an object with a 'target' key.  That target key is assigned to an
			 object that has its own value.  And that value is what we're testing here.
			 simulate is an enzyme function
			 the first argument of the simulate function is the event to simulate
			 the second argument is the optional mock event object that gets passed thru to event handlers
			 
			*/
		  accounts.find('input-wallet')
		    .simulate('change', { target: { value: userBalance}});

		  it('updates the local wallet balance in `state and converst it to a string', () => {
		  	expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
		  })

		});
	});
});


// include related tests within a describe block

// describe( 'Accounts', () => {
// 	  // shallow function takes in JSX as an argument and returns an object that represents the JSX component in the react testing environment
// 	// the app variable stores this object
// 	const accounts = shallow(<Accounts />);

// 	// for the globsl 'it' function, the first parameter (called a shrink) describes the test, the second is a function that actually runs the test
// 	it('renders correctly', () => {
// 	  expect(accounts).toMatchSnapshot();
// 	});

// 	it('initializes the `state` with an empty object', () => {
// 	  expect(accounts.state()).toEqual({});
// 	});

// 	// behavior driven development - user story based, based on certain conditions
// 	describe( 'When clicking the `add-gift` button', () => {

// 		beforeEach(() => {
// 		  // before each test, find the button element with the class 'btn-add' and simulate click on it
// 		  app.find('.btn-add').simulate('click');
// 		});

// 		afterEach(() => {
// 		  // after each test, reset the gifts property to default, basically un-doing the before-each, so each test is in isolation
// 		  app.setState({ gifts: [] });
// 		})

// 		it('adds a new gift to `state`', () => {
// 		  expect(app.state().gifts).toEqual([{ id: 1 }]);
// 		});

// 		it('adds a new gift to the rendered list', () => {
// 		  expect(app.find('.gift-list').children().length).toEqual(1);
// 		});

// 	})

// })

// // MORE EXAMPLES

// // on Gift component
// // example of simulating on-change...user input into input field
// // the change even simulates the event object that's created on an event in browser, storign value in object

//  describe('when typing into the person input', () => {

//    const person = 'Uncle';
   
//    beforeEach(() => {
//    	  gift.find('.input-person').simulate('change', { target: { value: person} });
//    });

//    it('updates the person in `state1', () => {
//      expect(gift.state().person).toEqual(person);
//    })	
//  })
 


// // Make sure that the component Renders 
// // Make sure that HandsonTable Renders
// // Make sure that the state initializes as an empty object
// // Make sure that getAccounts function works and retrieves necessary data from server
// // Make sure that data from getAccounts is loaded into state after api call
// // Make suyre mapStateToProps works
// // Make sure that the following CRUD functions for handsontable work:
//   //  afterChange: (change, source) => {
//     // afterChange
//     // beforeRemoveRow
//     // afterCopy 
//     // afterPaste 
// // 
