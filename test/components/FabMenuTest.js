/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';
import React from 'react';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';

import {FabMenu, FabMenuButton} from '../../src';

function deepRender(props) {
  return mount(React.createElement(FabMenu, props));
}

function shallowRender(props) {
  return shallow(React.createElement(FabMenu, props));
}

describe('FabMenu', () => {
  const childrenButtons = Array.from(Array(4).keys()) 
      .map((i) => {
        return (
            <FabMenuButton
              key={i}
              mini={false}
              secondary={true}
            />
          )
      });

  const rootButton = <FabMenuButton/>;

  let props;

  beforeEach(() => {
    props = {
      animation: 'pop',
      childrenButtons,
      layout: 'upward',
      rootButton,
    };
  });

  it('renders the root button', () => {
    const wrapper =  shallowRender(props);
    expect(wrapper.contains(rootButton)).to.equal.true
  });

  it("doesn't render the children buttons when open is false", ()=> {
    const wrapper = shallowRender({...props, open: false});

    expect(wrapper.contains(childrenButtons)).to.not.equal(true);
  });

  it("does render the children buttons when open is true", () => {
    const wrapper = shallowRender({...props, open: true});
    expect(wrapper.find(FabMenuButton).length).to.equal(5);
  });

  it("calls onRootClick when the root button is clicked", () => {
    const onRootClickSpy = sinon.spy();
    const wrapper = shallowRender({...props, onRootClick: onRootClickSpy});

    expect(onRootClickSpy).to.not.have.been.called;
    wrapper.find(FabMenuButton).first().simulate('click');
    expect(onRootClickSpy).to.have.been.called;
  });
});