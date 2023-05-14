import { Component } from 'react'
import { Table } from 'semantic-ui-react'
import UserContainer from '../containers/UserContainer'

class ListOfUsers extends Component {

    state = {
        arrayOfUsers: []
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    arrayOfUsers: data
                })
            })
    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Info Source</Table.HeaderCell>
                        <Table.HeaderCell>Agreed?</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <UserContainer users={this.state.arrayOfUsers} />
                </Table.Body>
            </Table>
        )
    }
}

export default ListOfUsers