import React, {Component, PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as projectsActionsCreators from '../actions/projectsActions';
import {
  Grid,
  Panel,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

class Projects extends Component {
  static contextTypes = {
    router: T.object
  };

  handleSubmit(e) {
    e.preventDefault();
    const [name] = e.target.elements;
    this.props.projectsActions.addProject(this.props.auth, {
      id:   Date.now(),
      name: name.value
    });
    // const { replace } = this.props.router;
    // this.props.userActions.loginUser(email.value, password.value).then(() => replace('/projects'))
  }

  componentDidMount() {
    this.props.projectsActions.getProjects(this.props.auth).then(console.log);
  }

  getProject(_id) {
    this.context.router.push(`/page/${_id}`);
  }

  render() {
    const { removeProject } = this.props.projectsActions;
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Form inline onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="formInlineText">
                <ControlLabel>Add project</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="new project"/>
              </FormGroup>
              {' '}
              <Button type="submit">
                Add
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Panel>
              <ListGroup>
                {this.props.projects.map(({ _id, name }) =>
                  <ListGroupItem key={_id}>
                    <Button onClick={() => removeProject(this.props.auth, _id)}>X</Button>
                    <a href="#" onClick={() => this.getProject(_id)}>{name}</a>
                  </ListGroupItem>)}
              </ListGroup>
            </Panel>
          </Col>
        </Row>


      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  }
};
function mapDispatchToProps(dispatch) {
  return {
    projectsActions: bindActionCreators(projectsActionsCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects);

