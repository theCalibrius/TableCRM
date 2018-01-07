import React from 'react';
import { shallow } from 'enzyme';
import { Contacts } from '../client/src/container/Contacts.jsx';

describe('Contacts', () => {
  const contacts = shallow(<Contacts />);

  it('initializes the `state` with 14 columns', () => {
    expect(contacts.state().columns.length).toEqual(14);
  });
});
