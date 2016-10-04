'use strict';

import React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import appSocket from '../sockets/appSocket';
import userActions from '../users/user-actions';
import { List } from 'immutable';

const UserList = React.createClass({
  componentDidMount: function() {
    this.socket = appSocket();
    this.socket.on('userList', function (users) {
      store.dispatch(userActions.userList(users));
    });
  },
  propTypes: {
    users: (props, propName) => List.isList(props[propName]),
    currentUser: React.PropTypes.string
  },
  render: function () {
    let users = this.props.users.map(toUserEntries, this);
    return <div className="col-md-3 panel panel-default">
      <div className="panel-body" id="user-list">{users}</div>
    </div>;
  }
});

export { UserList };

export default connect(mapStateToProps)(UserList);

/////

function mapStateToProps(state) {
  return {
    users: state.users.toArray(),
    currentUser: state.currentUser
  };
}

function toUserEntries(user, i) {
  let style = user === this.props.currentUser ? {'fontWeight': 'bold'} : {};
  return <div style={style} className="col-md-offset-1 col-md-10" key={i}>{user}</div>;
}