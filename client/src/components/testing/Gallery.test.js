import { shallow, mount, render } from 'enzyme';
import store from '../../store';
import Gallery from '../posts/Posts';
import PostsNavbar from '../posts/PostsNavbar';
import React from 'react';

it('expect Gallery render', () => {
  let navbar;
  navbar = shallow(<PostsNavbar store={store} />);
  expect(navbar.length).toEqual(1);
  expect(shallow(<Gallery store={store} />).length).toEqual(1);
});
