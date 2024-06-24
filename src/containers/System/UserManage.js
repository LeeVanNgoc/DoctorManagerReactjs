import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
        }
    }
    
    /**
     *  Life cycle
     * Run component
     * 1. Run construct -> init state
     * 2. Did mount (set state) : born ; unmount
     * 3. Render (re-render)
     */

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
		this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
	}

    render() {
        // console.log("Check render", this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen ={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    test={'abc'}
                    
                />
                <div className='title text-center'>Manage user with leengoc</div>
                <div className='mx-1'>
                    <button 
                    className='btn btn-primary px-3'
                    onClick={() =>this.handleAddNewUser()}
                    ><i class="fas fa-plus"></i> Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                            { arrUsers && arrUsers.map((item, index) => {
                                {/* console.log('Check map', item, index) */}
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }   
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
