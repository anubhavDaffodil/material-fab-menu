import React from 'react';

import LayoutDropdown from './LayoutDropdown';
import PaperContainer from './PaperContainer';

const animations = [
  'translate',
  'pop',
  'popStaggered',
];

const layoutClasses = {
  content: "col-xs-12 col-md-6 col-lg-4",
  padding: "col-xs-0 col-md-3 col-lg-4",
};

const styles = {
  container: {
    height: '100vh',
  },

  appContainer: {
    height: '100%',
  }
};



const ExampleApp = React.createClass({
  getInitialState() {
    return {
      selectedAnimation: 0,
    };
  },

  render() {
    return (
      <div 
        className="container-fluid"
        style={styles.container}
      >
        <div className={layoutClasses.padding} />
        <div className={layoutClasses.content} style={styles.appContainer}>
          <PaperContainer>
            <LayoutDropdown
              items={animations}
              onChange={this._setNewAnimation}
              value={this.state.selectedAnimation}
              />
          </PaperContainer>
        </div>
        <div className={layoutClasses.padding} />
      </div>
      )
  },

  _setNewAnimation(index) {
    this.setState({selectedAnimation: index});
  }
});

export default ExampleApp;