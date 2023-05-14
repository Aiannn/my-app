import { Table } from "semantic-ui-react"
import { Component } from "react"

class UserContainer extends Component {

    getUsers = () => {
        return this.props.users.map(user => {
            return (
                <Table.Row>
                    <Table.Cell>{user.first_name}</Table.Cell>
                    <Table.Cell>{user.last_name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.age}</Table.Cell>
                    <Table.Cell>{user.info_source}</Table.Cell>
                    <Table.Cell>{user.agreed ? 'Yes' : 'No'}</Table.Cell>
                </Table.Row>
            )
        })
    }

    render() {
        return (
            <>
                {this.getUsers()}
            </>
        )
    }
}

export default UserContainer