import React from 'react';
import { shallow } from 'enzyme';
import { Leads } from '../client/src/container/Leads.jsx';

describe('Leads', () => {
  const leads = shallow(<Leads />);

  it('initializes the `state` with 11 columns', () => {
    expect(leads.state().columns.length).toEqual(11);
  });
});
