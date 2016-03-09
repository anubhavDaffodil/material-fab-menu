import Radium from 'radium';
import React from 'react';

import Paper from 'material-ui/lib/paper';

const PaperContainer = React.createClass({
  render() {
    return (
      <div
        className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3"
        >
          <div style={styles.container} >
            <Paper />
          </div>
      </div>
    )
  },
})

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '80%',
    justifyContent: 'center',
    width: '100%',
  }
}

export default Radium(PaperContainer);