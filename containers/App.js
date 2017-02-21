import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchApiIfNeeded } from '../actions';
import styles from './App.css';

class App extends Component {
  static propTypes = {
    name: PropTypes.string,
    result: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.handleFetchClick = this.handleFetchClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchApiIfNeeded(this.props.name));
  }

  handleFetchClick(event) {
    event.preventDefault();
    this.props.dispatch(fetchApiIfNeeded(this.props.name));
  }

  render() {
    const { isFetching, result, name } = this.props;

    return (
      <div className={isFetching ? styles.fetching : styles.normal}>
        {!result && isFetching
          ? <h3>Loading...</h3>
          : <h3>{name || 'Status'}</h3>
        }
        {result && !name &&
          <div>
            <p>{result.status}</p>
            <p>{new Date(result.last_updated).toString()}</p>
          </div>
        }
        {result && name &&
          <div>
            <p>{result.name}</p>
            <p>{result.bio}</p>
          </div>
        }
        {!isFetching &&
          <a href='#' onClick={this.handleFetchClick}>Fetch</a>
        }
      </div>
    );
  }
}

function mapStateToProps({ api: { result, isFetching } }, props) {
  return {
    result,
    isFetching,
    name: props.params.name
  };
}

export default connect(mapStateToProps)(App);
