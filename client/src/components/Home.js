import React, {PropTypes as T} from 'react'
import {Button} from 'react-bootstrap'
import {AuthService} from '../utils'
import Messages from './Messages'
import ProfileDetails from './ProfileDetails'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  };

  static propTypes = {
    auth: T.instanceOf(AuthService)
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: props.auth.getProfile()
    };
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile })
    })
  }

  logout() {
    this.props.auth.logout();
    this.context.router.push('/login');
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        <h2>Home</h2>
        <p>Welcome {profile.name}!</p>
        <ProfileDetails profile={profile}/>
        <Messages auth={this.props.auth}/>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;