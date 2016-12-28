import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

export class Messages extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      publicMsg:  "",
      privateMsg: ""
    };
    this.callApis()
  }

  callApis() {
    const { auth } = this.props;
    // public http request
    fetch('/api/public')
      .then(response => response.json())
      .then(response => this.setState({ publicMsg: response.message }));
    // using auth to send an http request with authorization header
    auth.fetch('/api/private')
      .then(response => this.setState({ privateMsg: response.message }))
      .catch(error => this.setState({ privateMsg: "eeee" + error }))
  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem header="/api/public response">
          {this.state.publicMsg}
        </ListGroupItem>
        <ListGroupItem header="/api/private response">
          {this.state.privateMsg}
        </ListGroupItem>
      </ListGroup>
    )
  }
}

export default Messages;