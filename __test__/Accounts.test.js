import React from 'react';
import { shallow } from 'enzyme';
import { Accounts } from '../client/src/container/Accounts.jsx';

describe('Accounts', () => {
  const accounts = shallow(<Accounts />);

  it('initializes the `state` with 13 columns', () => {
    expect(accounts.state().columns.length).toEqual(13);
  });
});
