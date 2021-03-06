import React, {PropTypes} from 'react';
import Radium from 'radium';
import Highlight from 'react-highlight';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
};

const CodeDisplay = React.createClass({
  propTypes: {
    configuration: PropTypes.shape({
      animation: PropTypes.string,
      isDirectionUp: PropTypes.bool,
      isMini: PropTypes.bool,
    }),
  },

  render() {
    const snippet = this._makeSnippet();

    return (
      <div style={styles.container} >
        {snippet}
      </div>
    );
  },
 
  _makeSnippet() {
    return makeSnippet({
      animation: this.props.configuration.animation,
      isDirectionUp: this.props.configuration.isDirectionUp,
      isMini: this.props.configuration.isMini,
    });
  }
});

function makeSnippet(configObj) {
  const {animation, isDirectionUp, isMini} = configObj;

  const subSnippets = {
    layout: isDirectionUp ? 'upward' : 'downward',
    style: isDirectionUp ? "bottom: '0px'" : "top: '0px'",
  };

  const template = `
import {FabMenu, FabMenuButton} from 'fab-menu';

// Inside component: 
render() {
  const childrenButtons = Array.from(Array(4).keys()) 
  .map((i) => {
    return (
      <FabMenuButton
        key={i}
        mini={${isMini}}
        secondary={true}
      >
        <ContentAdd />
      </FabMenuButton>
    )
  });
  
  const rootButton = (
    <FabMenuButton>
      <ContentAdd />
    </FabMenuButton>
  ); 

  return (
    <FabMenu
      animation="${animation}"
      childrenButtons={childrenButtons}
      layout="${subSnippets.layout}"
      onRootMouseUp={openFn}
      open={this.state.open}
      rootButton={rootButton}
      style={{position: 'absolute', right: '0px', ${subSnippets.style}}}
    />
  )  
}`;

  return (
    <Highlight className="js" >
      {template}
    </Highlight>
    )
}

export default Radium(CodeDisplay);