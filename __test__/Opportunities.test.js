import React from 'react';
import { shallow } from 'enzyme';
import { Opportunities } from '../client/src/container/Opportunities.jsx';

describe('Opportunities', () => {
  const opportunities = shallow(<Opportunities />);

  it('initializes the `state` with 14 columns', () => {
    expect(opportunities.state().columns.length).toEqual(14);
  });
});
