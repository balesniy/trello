import React from 'react';
export default ({ onSubmit }) => {

  return <div className="col-xs-10 col-xs-offset-1 well">
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="inputName">Name</label>
        <input id="inputName" className="form-control" type="text"/>
      </div>
      <div className="form-group">
        <label htmlFor="inputDescription">Description</label>
        <textarea id="inputDescription" className="form-control" rows="3"/>
      </div>
      <button type="submit" className="btn btn-default form-control">Add task</button>
    </form>
  </div>
}