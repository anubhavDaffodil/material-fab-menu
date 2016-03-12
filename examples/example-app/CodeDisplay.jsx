import React, {PropTypes} from 'react';
import Radium from 'radium';


const styles = {
  code: {
    marginBottom: '0px',
    padding: '20px',
    whiteSpace: 'pre',
  },

  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },

  pre: {
    marginBottom: '0px',
    padding: '0px',
  }
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
  componentDidUpdate() {
    const pre = this.refs.precode;
    hljs.highlightBlock(pre);
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
      animation={'${animation}'}
      childrenButtons={childrenButtons}
      layout={${subSnippets.layout}}
      onRootMouseUp={() => this.setState({open: !this.state.open})}
      open={this.state.open}
      rootButton={rootButton}
      style={{position: 'absolute', right: '0px', ${subSnippets.style}}}
    />
  )  
}`;
  const t = `
  import {FabMenu, Fab} from 'fab-menu';

  render() {
    return 'whatever'
  }
  `
  const html = hljs.highlight('js', template).value;
  return (
    <pre
      ref="precode" 
      style={styles.pre}>
      <code style={styles.code}
        dangerouslySetInnerHTML={{__html: html}}>
      </code>
    </pre>);
}

export default Radium(CodeDisplay);