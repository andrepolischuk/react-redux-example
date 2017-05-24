import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addUser, deleteUser, handleError } from '../actions';
import styles from './App.css';

class App extends Component {
  static propTypes = {
    name: PropTypes.string,
    users: PropTypes.array,
    error: PropTypes.string,
    fetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;

    if (name) {
      this.props.dispatch(addUser(name));
    }
  }

  componentWillReceiveProps({ name }) {
    if (name && name !== this.props.name) {
      this.props.dispatch(addUser(name));
    }
  }

  submit(event) {
    const { value } = event.target.querySelector('input');

    event.preventDefault();

    if (value) {
      this.props.dispatch(addUser(value));
    }
  }

  render() {
    const { users, error, fetching } = this.props;

    return (
      <div className={fetching ? styles.fetching : styles.normal}>
        <form onSubmit={event => this.submit(event)}>
          <input
            type='text'
            placeholder='Type github username...'
            tabIndex='0'
            autoFocus
          />
          <button type='submit'>Add</button>
        </form>
        {error &&
          <p className={styles.error}>
            {error}&nbsp;
            <button
              type='button'
              onClick={() => this.props.dispatch(handleError(null))}
            >
              Close
            </button>
          </p>
        }
        {users.map(user => (
          <p key={user.login}>
            <a href={user.html_url}>{user.name}</a>&nbsp;
            <small>{user.login}</small>&nbsp;
            <button onClick={() => this.props.dispatch(deleteUser(user.login))}>
              Delete
            </button>
          </p>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ user: { users, fetching, error } }, props) {
  return {
    users,
    error,
    fetching,
    name: props.params.name
  };
}

export default connect(mapStateToProps)(App);
