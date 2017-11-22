// like reducers, action creators are pure functions with unique retun values based 
// on the input, and so the tests are set up to test pure functions (as opposed to, 
// for example, react components)

// import action creator file, using * to import every exported function from the file
import * as actions from '../client/src/actions/accountsActions';

it('creates an action to set the balance', () => {
	// declare what the paramters passed into the action creator will be
	const balance = 0;

	// declare what the expected output from the action creator will be
	const expectedAction = { type: 'GET_ALL_ACCOUNTS' , balance };

	// call the action creator and pass in the paramters and test equivalance to expected
	expect(actions.setBalance(balance)).toEqual(expectedAction);
});

// WARNING:  This has dumy code/variables in it - Deposit and Withdraw Methods lesson on Udemy course
it('creates an action to _______', () => {
	const deposit = 10;

	const expectedAction = { type: constants.DEPOSIT, deposit };

	expect(actions.deposit(deposit)).toEqual(expectedAction);
});

it('deposits into the balance', () => {
	const deposit = 10;

	const initialState = 5;

	expect(balanceReducer(initialState, { type: constants.DEPOSIT, deposit})).toEqual(initialState + deposit);
});

it('creates an action to withdraw from the balance', () => {
	const withdrawal = 10;

	const expectedAction = { type: constants.WITHDRAW, withdrawal };

	expect(actions.withdrawal(withdrawal)).toEqual(expectedAction);
});

