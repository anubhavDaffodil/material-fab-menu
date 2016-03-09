import Radium from 'radium';
import React from 'react';

import Paper from 'material-ui/lib/paper';

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },

  paper: {
    height: '60%',
    width: '100%',
  }
};

const PaperContainer = React.createClass({
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.paper}>
          {this.props.children}
        </Paper>
      </div>
    )
  },
})



export default Radium(PaperContainer);