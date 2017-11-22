/*

 like action creators, reducers are pure functions with unique retun values based 
 on the input, and so the tests are set up to test pure functions (as opposed to, 
 for example, react components)

*/

import accountsReducer from '../client/src/reducers/accountsReducer';

// using a describe block with reducers is helpful because the return value
// of reducers is situational, it depends on conditions of its input

describe('accountsReducer', () => {
	it('sets a balance', () => {
		const balance = 10;

// first parameter is previous state, second parameter is an action object passed in from an action creator
// in the action object it needs a type and it needs a data property whose value is the data returned
		expect(accountsReducer(undefined, {type: 'GET_ALL_ACCOUNTS', balance} )).toEqual(balance);
	})
})

