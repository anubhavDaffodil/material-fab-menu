import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/Main';
import {FabMenu, FabMenuButton} from '../src';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ExampleApp from './example-app/ExampleApp';
// Render the main component into the dom
import PaperContainer from './example-app/PaperContainer';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Examples = React.createClass({
  render() {
    return (
      <ExampleApp />
    )
  }
});

ReactDOM.render(<Examples />, document.getElementById('app'));

// ReactDOM.render(<MenuExample />, document.getElementById('app'));
