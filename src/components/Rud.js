import { Component } from "react";
import { Button, Form, Table } from 'semantic-ui-react'
import FormFieldForUpdate from "./FormFieldForUpdate";

class Rud extends Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        id: '',
        info_source: '',
        agreed: '',
        toUpdate: false
    }

    handleDelete = e => {
        fetch(`http://localhost:3000/users/${this.state.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    age: '',
                    id: '',
                    info_source: '',
                    agreed: ''
                })
                alert(`${data.message}`)
            })

    }

    handleToUpdateButton = e => {
        this.setState({
            toUpdate: !this.state.toUpdate
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        let obj = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/users/findOne', obj)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to find user.')
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    info_source: data.info_source,
                    age: data.age,
                    agreed: data.agreed,
                    id: data.id
                })
            })
            .catch(error => {
                alert('Failed to find user:' + error.message)
            })
    }

    render() {
        return (
            <>
                <div className="form-container">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name' name='first_name' value={this.state.first_name} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder='Last Name' name='last_name' value={this.state.last_name} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>

                {this.state.id ?
                    <>
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
                                <Table.Row>
                                    <Table.Cell>{this.state.first_name}</Table.Cell>
                                    <Table.Cell>{this.state.last_name}</Table.Cell>
                                    <Table.Cell>{this.state.email}</Table.Cell>
                                    <Table.Cell>{this.state.age}</Table.Cell>
                                    <Table.Cell>{this.state.info_source}</Table.Cell>
                                    <Table.Cell>{this.state.agreed ? 'Yes' : 'No'}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Button onClick={this.handleDelete}>Delete</Button>
                        <Button onClick={this.handleToUpdateButton}>Update</Button>
                        {
                            this.state.toUpdate ?
                                <div className="form-container">
                                    <FormFieldForUpdate id={this.state.id} />
                                </div>
                                :
                                null
                        }
                    </>
                    :
                    null
                }
            </>
        )
    }
}

export default Rud