import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/Main';
import {FabMenu, FabMenuButton} from '../src';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

// Render the main component into the dom

const MenuExample = React.createClass({
  getInitialState() {
    return {
      open: Array.from(Array(4).keys()).map(() => false),
    }
  },

  render() {
    const rootFAB = (
      <FabMenuButton  onMouseUp={()=> console.log('k')} >
        <ContentAdd />
      </FabMenuButton>
     );
    const childrenFABS = [0,1,2,3].map(() => {
      return (
          <FabMenuButton  mini={false} secondary={true}>
            <ContentAdd />
          </FabMenuButton>
        )
    });
   return (
      <div>
        <FabMenu
          animation="translate"
          childrenButtons={childrenFABS}
          layout="upward"
          onRootMouseUp={this._openMenu.bind(this, 0)}
          open={this.state.open[0]}
          rootButton={rootFAB}
          style={{position: 'fixed', top: 600, left: 300}}
        />
        <FabMenu
          animation="translate"
          childrenButtons={childrenFABS}
          layout="downward"
          onRootMouseUp={this._openMenu.bind(this, 1)}
          open={this.state.open[1]}
          rootButton={rootFAB}
          style={{position: 'fixed', top: 600, left: 400}}
        />
        <FabMenu
          animation="pop"
          childrenButtons={childrenFABS}
          layout="upward"
          onRootMouseUp={this._openMenu.bind(this, 2)}
          open={this.state.open[2]}
          rootButton={rootFAB}
          style={{position: 'fixed', top: 600, left: 500}}
        />
        <FabMenu
          animation="pop"
          childrenButtons={childrenFABS}
          layout="downward"
          onRootMouseUp={this._openMenu.bind(this, 3)}
          open={this.state.open[3]}
          rootButton={rootFAB}
          style={{position: 'fixed', top: 600, left: 600}}
        />
        <FabMenu
          animation="popStaggered"
          childrenButtons={childrenFABS}
          layout="upward"
          onRootMouseUp={this._openMenu.bind(this, 4)}
          open={this.state.open[4]}
          rootButton={rootFAB}
          style={{position: 'fixed', top: 600, left: 700}}
        />
        <FabMenu
          animation="popStaggered"
          childrenButtons={childrenFABS}
          layout="downward"
          onRootMouseUp={this._openMenu.bind(this, 5)}
          open={this.state.open[5]}
          rootButton={rootFAB}
          style={{position: 'fixed', top: 600, left: 800}}
        />
      </div>
    )
  },

  _openMenu(n) {
    var nextOpen = this.state.open.slice();
    nextOpen[n] = !nextOpen[n];
    this.setState({open: nextOpen});
  },
});

ReactDOM.render(<MenuExample />, document.getElementById('app'));
