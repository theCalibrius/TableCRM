# Project Name

> Pithy project description

## Team

* **Product Owner**: teamMember
* **Scrum Master**: teamMember
* **Development Team Members**: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
	1. [Installing Dependencies](#installing-dependencies)
	1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

* Node 0.10.x
* Redis 2.6.x
* Postgresql 9.1.x
* etc
* etc

## Development

### Install Dependencies

From within the root directory:

```sh
yarn
```

### Start Database Server

From within the root directory:

```sh
mysql.server start
mysql -u root < server/db/schema.sql
```

### Start the App

From within the root directory:

```sh
yarn start
yarn dev
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

## Note

A container is a normal react component that has been linked to application stae
containers are the link between state, managed by redux, and views, managed by
react the react-redux library, from which we import 'connect' function below, is
how we bridge these two libraries components that care about/depend on a certain
piece of state should be containers whenever we connect a component to redux,
that component becomes a container, or "smart component"

we connect this container with the relevant action creator by importing the
action creator (getAccounts) below and then using dispatch. This makes it so
that whenever getAccounts action creator is called the result should be passed
to all of the reducers.

dispatch is a function that takes in action creators and passes them on to all
the different reducers it "dispatches" an action. This is the only way to
trigger a state change.

documentation: https://redux.js.org/docs/api/Store.html#dispatch

mapStateToProps is a function that takes in application state and returns a
portion of it in this case, mapStateToProps takes in application state and
returns the accounts property and adds it to the Accounts component's props. It
is used to pull data from the store when it changes and pass those values as
props to the component.

mapStateToProps tells how to transform the current Redux store state into the
props you want to pass to a presentational component (Account) that you are
wrapping.

The return value of the mapStateToProps function will be added to props on the
Accounts component. When we export and evoke the connect function below, the
Accounts component will merge with the object returned from mapStateToPropse,
creating a container

If the state changes at any point, the new state will be added to props and the
container will automatically re-render

documentation:
https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

the connect function takes in a function (mapStateToProps) and a component
(Accounts) and produces a container, that container is what we are exporting
below the second, optional, argument of connect is mapDispatchToProps. When one
is not provided, as below, then React Redux will provide a default version,
which simply returns the dispatch function as a prop, making dispatch available
on the props, which is how we can call it above inside of ComponentDidMount

// invoking connect will return a function, we then pass Accounts to that
function and invoke it // the first parameter passed to connect is a function
which describes which part of the redux // store we want to use on this
component, the second parameter describes which action creators // we want to
use on this componenet to send data to the redux store. In this case, the second
// parameter is null, because we instead link the getAllAccounts action creator
to this component // in the ComponentDidMount method above.

reducer

Normally you would want to import the relevant action creator into the reducer,
but in this project we are instead using the index.js file, along with the redux
function combineReducers to connect all the reducers and action creator files.

A reducer is a function that returns a piece of the application state
accountsReducer returns the accounts related data from the application state
this reducer, along with all other reducers (via combineReducers in index.js)
will add a property to the application state, in this case named 'accounts' The
value of the accounts property will be the return value from the reducer, which
in this case depends on the 'GET_ALL_ACCOUNTS' action, which makes a call to the
backend and retrieves data from the database.

When an action is triggered, the return object is sent to all reducers. The
reducer then has a switch statement that leads to a different line of code
depending on the type of action that was triggered (action.type).

below, if the action.type is equal to 'GET_ALL_ACCOUNTS' then the reducer will
return specific data that will become the new value of state. For any other
action types, the reducer will simply return the default/preexisting value
'state'.

reducers then notify containers of the changes to state, after which the
containers will automatically re-render with new props
