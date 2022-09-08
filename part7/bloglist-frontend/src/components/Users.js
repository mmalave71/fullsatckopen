import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
//import usersService from '../services/users'
import { Table } from 'react-bootstrap'

const Users =() => {
  const users = useSelector(state => state.users)
  return (<>
    <h3> Users</h3>
    <Table striped>

      <tbody>
        <tr><th></th><th> blog created</th></tr>
        {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`} > {user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
      </tbody>
    </Table>
  </>)
}
export default Users
