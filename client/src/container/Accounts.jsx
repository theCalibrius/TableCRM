/* 
A container is a normal react component that has been linked to application stae
containers are the link between state, managed by redux, and views, managed by react
the react-redux library, from which we import 'connect' function below, is how we bridge these two libraries
components that care about/depend on a certain piece of state should be containers
whenever we connect a component to redux, that component becomes a container, or "smart component"

we connect this container with the relevant action creator by importing the action creator (getAccounts)
below and then using dispatch.  This makes it so that whenever getAccounts action creator is called
the result should be passed to all of the reducers.

dispatch is a function that takes in action creators and passes them on to all the different reducers
it "dispatches" an action.  This is the only way to trigger a state change.

documentation:
https://redux.js.org/docs/api/Store.html#dispatch

*/
import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';
import HotTable from 'react-handsontable';

import React from 'react';
import { connect } from 'react-redux';

import { getAccounts, createAndUpdateAccounts, deleteAccounts } from '../actions/accountsActions';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('Component Did Mount!');
    this.props.dispatch(getAccounts);
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.accounts ? (
            <p>loading...</p>
          ) : (
            <HotTable
              root="hot"
              ref="hot"
              settings={{
                licenseKey: '',
                data: this.props.accounts,
                dataSchema: {
                  id: null,
                  description: null,
                  industryId: null,
                  email: null,
                  phoneNumber: null,
                  street: null,
                  city: null,
                  state: null,
                  postalCode: null,
                  country: null,
                  website: null,
                  createdAt: null,
                  updatedAt: null

                },
                colHeaders: [
                  'id',
                  'description',
                  'industryID',
                  'email',
                  'phoneNumber',
                  'street',
                  'city',
                  'state',
                  'postalCode',
                  'country',
                  'website',
                  'createdAt',
                  'updatedAt'
                ],
                columns: [
                  { data: 'id' },
                  { data: 'description' },
                  { data: 'industryID' },
                  { data: 'email' },
                  { data: 'phoneNumber' },
                  { data: 'street' },
                  { data: 'city' },
                  { data: 'state' },
                  { data: 'postalCode' },
                  { data: 'country' },
                  { data: 'website' },
                  { data: 'createdAt', readOnly: true },
                  { data: 'updatedAt', readOnly: true }
                ],
                rowHeaders: true,
                minSpareRows: 1,
                stretchH: 'all',
                contextMenu: ['remove_row'],
                filters: true,
                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                columnSorting: true,
                afterChange: (changes, source) => {
                  // console.log(`afterChange: change: ${change}, source: ${source}`);
                  this.props.dispatch(createAndUpdateAccounts(changes, source).bind(this));
                },
                beforeRemoveRow: (index, amount) => {
                  this.props.dispatch(deleteAccounts(index, amount).bind(this));
                },
                afterCopy: (index, amount) => {
                  console.log(`afterCopy: index: ${index}, amount: ${amount}`);
                },
                afterPaste: (index, amount) => {
                  console.log(`afterPaste: index: ${index}, amount: ${amount}`);
                }
              }}
            />
          )}
        </div>
      </div>
    );
  }
} // end of class

/* 
mapStateToProps is a function that takes in application state and returns a portion of it
in this case, mapStateToProps takes in application state and returns the accounts property 
and adds it to the Accounts component's props.  It is used to pull data from the store when it changes
and pass those values as props to the component.

mapStateToProps tells how to transform the current Redux store state into the props you want to pass to
a presentational component (Account) that you are wrapping. 

The return value of the mapStateToProps function will be added to props on the Accounts component.  
When we export and evoke the connect function below, the Accounts component will merge with the object 
returned from mapStateToPropse, creating a container

If the state changes at any point, the new state will be added to props and the container will automatically re-render

documentation: 
https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
*/

const mapStateToProps = state => ({
  accounts: state.accountsReducer.accounts
});

/* 
the connect function takes in a function (mapStateToProps) and a component (Accounts) and
produces a container, that container is what we are exporting below
the second, optional, argument of connect is mapDispatchToProps.  When one is not provided,
as below, then React Redux will provide a default version, which simply returns the dispatch function
as a prop, making dispatch available on the props, which is how we can call it above inside of
ComponentDidMount

*/
export default connect(mapStateToProps, null)(Accounts);
