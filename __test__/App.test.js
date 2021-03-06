import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';

describe('App', () => {
  const app = shallow(<App />);

  it('renders properly', () => {
    expect(app).toMatchSnapshot();
  });
});
