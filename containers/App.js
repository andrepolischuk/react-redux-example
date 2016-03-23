import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUserIfNeeded } from '../actions';
import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserIfNeeded());
  }

  handleRefreshClick(event) {
    event.preventDefault();
    this.props.dispatch(fetchUserIfNeeded());
  }

  render() {
    const { data, isFetching } = this.props;
    const isEmpty = !data.name;

    return (
      <div className={isFetching ? styles.fetching : styles.normal}>
        {isEmpty && isFetching
          ? <h3>Loading...</h3>
          : <h3>Hello {data.name}!</h3>
        }
        {!isFetching &&
          <a href="#" onClick={this.handleRefreshClick}>
            Refresh
          </a>
        }
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps({ user }) {
  const { isFetching, data } = user || {
    isFetching: false,
    data: {}
  };

  return {
    isFetching,
    data
  };
}

export default connect(mapStateToProps)(App);
