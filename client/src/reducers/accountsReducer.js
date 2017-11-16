/* 
A reducer is a function that returns a piece of the application state
accountsReducer returns the accounts related data from the application state
this reducer, along with all other reducers (via combineReducers in index.js) will
add a property to the application state, in this case named 'accounts'
The value of the accounts property will be the return value from the reducer, which
in this case depends on the 'GET_ALL_ACCOUNTS' action, which makes a call to the
backend and retrieves data from the database.

When an action is triggered, the return object is sent to all reducers.  The reducer
then has a switch statement that leads to a different line of code depending on the 
type of action that was triggered (action.type).

below, if the action.type is equal to 'GET_ALL_ACCOUNTS' then the reducer will return
specific data that will become the new value of state.  For any other action types, the reducer
will simply return the default/preexisting value 'state'.

reducers then notify containers of the changes to state, after which the containers will
automatically re-render with new props

*/

export default function(
  state = {
    accounts: null
  },
  action
) {
  switch (action.type) {
    case 'GET_ALL_ACCOUNTS':
      return {
        ...state,
        accounts: [...action.payload]
      };
  }
  return state;
}
