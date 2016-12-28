import React from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import Messages from './Messages'

export class Login extends React.Component {

  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <Messages auth={this.props.auth}/>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;