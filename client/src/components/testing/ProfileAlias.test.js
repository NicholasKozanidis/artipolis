import { shallow, mount, render } from 'enzyme';
import store from '../../store';
import ProfileAlias from '../profile/ProfileAlias';
import React from 'react';

it('expect ProfileAlias render', () => {
  expect(shallow(<ProfileAlias store={store} />).length).toEqual(1);
});
