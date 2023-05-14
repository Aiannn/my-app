import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class AppHeader extends React.Component {

    state = {
        activeItem: 'register'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div id='app-header'>
                <Menu tabular>
                    <NavLink to='/new'>
                        <Menu.Item
                            name='Register User'
                            active={activeItem === 'register'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    <NavLink to='/findAll'>
                        <Menu.Item
                            name='All Users'
                            active={activeItem === 'allusers'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    <NavLink to='/alter'>
                        <Menu.Item
                            name='Edit User'
                            active={activeItem === 'edit'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                </Menu>
            </div>
        )
    }
}

export default AppHeader 