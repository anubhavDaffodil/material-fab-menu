# material-fabmenu
This is a FAB menu component to be used with Call-Em-All's excellent React [material-ui library](http://www.material-ui.com/#/)

`npm install material-fabmenu`
### Dependencies
Aside from the aforementioned [material-iu](https://github.com/callemall/material-ui) being a peer-dependency, this component uses [velocity-react](https://github.com/twitter-fabric/velocity-react) (and so [velocity.js](http://github.com/julianshapiro/velocity)) to perform the animations.

### Usage

Demo and usage snippets can be found [here](https://theosherry.github.io/projects/fab-menu).

~~~javascript
import React from 'react';
import {FabMenu, FabMenuButton} from 'material-fabmenu';

const Example = React.createClass({
  getInitialState() {
    return {open: false};
  },

  render() {
    const childrenButtons = Array.from(Array(4).keys()) 
        .map((i) => {
          return (
              <FabMenuButton
                key={i}
                mini={true}
              />
            )
        });

    const rootButton = <FabMenuButton />;

    return (
      <FabMenuButton
        animation="translate"
        childrenButtons={childrenButtons}
        layout="downward"
        onRootMouseUp={() => this.setState({open: !this.state.open})}
        open={this.state.open}
        rootButton={rootButton}
        style={{position: 'absolute', right: '0px', bottom: '0px'}}
      />
      )
  } 
});
~~~
### API
#### FabMenuButton
`FabMenuButton` has exactly the same API as [material-ui's FAB](http://www.material-ui.com/#/components/floating-action-button).  At this time the buttons must be passed in as props (`childrenButtons`, `rootButton`).

#### FabMenu
##### Required

###### `childrenButtons : array`
Array of `FabMenuButton` elements.

###### `rootButton : node`
The root button; `FabMenuButton` element.

##### Optional
###### `animation : string`
Determines the children buttons' entrance and exit animations; one of 'translate', 'pop', 'popStaggered'.
Defaults to 'pop'.

###### `layout : string`
Determines the direction the children buttons leave the root button; either 'downward' or 'upward'.
Defaults to 'upward'.

##### `onRootMouseUp : function`
Callback function fired on `mouseup` event targeting the root button.

##### `open : string`
Determines whether the menu is open or not. Defaults to `false`.

##### `style : object`
Styles to be applied to the root button.  This is really just to be used for positioning the menu.  `relative`, `static`, `absolute`, and `fixed` positioning are supported.
Defaults to 
~~~javascript
{
  left:300,
  position: 'fixed',
  top: 600
}
~~~


