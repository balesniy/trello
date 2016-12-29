import React from 'react'
import {Jumbotron} from 'react-bootstrap'

export class Container extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <Jumbotron>
        <h2>
          <img role="presentation" src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
          Это контейнер для всех
        </h2>
        {children}
      </Jumbotron>
    )
  }
}

export default Container;