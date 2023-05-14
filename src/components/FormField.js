import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio } from 'semantic-ui-react'


class FormField extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        info_source: '',  //*****that looks weird, but this is the only solution
        //i found to solve it, since semantic-ui-react "However, many Semantic UI components, such as a Dropdown, Checkbox, and Radio do not work directly with native browser form controls such as input and select. They are built using stylized markup and custom internal state."
        agreed: false
    }

    handleChangeRadio = (e, { value }) => {
        this.setState({ value })
        this.setState({ info_source: value }) //*****/
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeBoolean = (e) => {
        this.setState(prevState => ({
            agreed: !prevState.agreed
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let obj = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/users', obj)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register user.') //didn't have a time to specify the error
                }
                return response.json()
            })
            .then(data => {
                alert(`User has been registered with id${data.id}`)
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    age: '',
                    info_source: '',
                    agreed: false
                })
            })
            .catch(error => {
                alert('Failed to register user: ' + error.message)
            })
    }

    render() {
        const { value } = this.state
        return (
            <Form size="small" onSubmit={this.handleSubmit}>
                <Form.Field
                    required
                    control={Input}
                    name='first_name'
                    value={this.state.first_name}
                    label='First name'
                    placeholder='First name'
                    onChange={this.handleChange}
                />
                <Form.Field
                    required
                    control={Input}
                    name='last_name'
                    value={this.state.last_name}
                    label='Last name'
                    placeholder='Last name'
                    onChange={this.handleChange}
                />
                <Form.Field
                    required
                    control={Input}
                    name='email'
                    value={this.state.email}
                    label='Email'
                    placeholder='Email'
                    onChange={this.handleChange}
                />
                <Form.Group inline>
                    <label>How did you hear about us</label>
                    <Form.Field
                        control={Radio}
                        label='Friends'
                        value='Friends'
                        checked={value === 'Friends'}
                        onChange={this.handleChangeRadio}
                    />
                    <Form.Field
                        control={Radio}
                        name={this.state.info_source}
                        label='Internet'
                        value='Internet'
                        checked={value === 'Internet'}
                        onChange={this.handleChangeRadio}
                    />
                    <Form.Field
                        control={Radio}
                        name={this.state.info_source}
                        label='TV'
                        value='TV'
                        checked={value === 'TV'}
                        onChange={this.handleChangeRadio}
                    />
                </Form.Group>
                <Form.Field
                    control={Input}
                    name='age'
                    value={this.state.age}
                    label='Age'
                    placeholder='Age'
                    onChange={this.handleChange}
                />
                <Form.Field
                    required
                    control={Checkbox}
                    name='agreed'
                    value={this.state.agreed}
                    label='I agree to the Terms and Conditions'
                    onChange={this.handleChangeBoolean}
                />
                <Form.Field control={Button} disabled={(!this.state.first_name ||
                    !this.state.last_name ||
                    !this.state.email ||
                    !this.state.agreed)
                }>Submit</Form.Field>
            </Form>
        )
    }
}

export default FormField