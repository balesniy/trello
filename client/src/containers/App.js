import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActionCreators from '../actions/userActions';
import {Grid, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const [email, password] = e.target.elements;
    const { replace } = this.props.router;
    this.props.userActions.loginUser(email.value, password.value).then(() => replace('/projects'))
  }

  render() {
    return (
      <Grid>
        <Form inline onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Email</ControlLabel>
            {' '}
            <FormControl type="email" placeholder="jane.doe@example.com"/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlinePassword">
            <ControlLabel>Password</ControlLabel>
            {' '}
            <FormControl type="password" placeholder="secret"/>
          </FormGroup>
          {' '}
          <Button type="submit">
            Login
          </Button>
        </Form>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
