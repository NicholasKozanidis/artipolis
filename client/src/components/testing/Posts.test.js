import { shallow, mount, render } from 'enzyme';
import store from '../../store';
import Posts from '../posts/Posts';
import React from 'react';

it('expect Posts render', () => {
  expect(shallow(<Posts store={store} />).length).toEqual(1);
});
