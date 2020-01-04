import React, { Component } from "react";
import "./App.css";

class Email extends Component {
    state = {
        emailAddress: '',
        emailList: [],
        emailListEnabled: [],
        showOnlyEnabled: false,
        isSearchOpen: false,
        searchUsers: []
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleAddToList = (e) => {
        e.preventDefault()
        this.setState({
            emailList: this.state.emailList.concat([{
                emailAddress: this.state.emailAddress,
                isEnabled: false
            }])
        }, () => {
            this.setState({
                emailAddress: "",
            })
        })
    }

    handleRemove = index => {
        this.setState({
            emailList: this.state.emailList.filter((blog, i) => {
                if (index === i) {
                    return null;
                }
                else return blog;
            })
        })
    }

    handleIsEnabled = (index) => {
        this.setState({
            emailList: this.state.emailList.map((email, i) => {
                if (index === i) {
                    if(email.isEnabled) {
                        return {
                            emailAddress: email.emailAddress,
                            isEnabled: false
                        }
                    }
                    return {
                        emailAddress: email.emailAddress,
                        isEnabled: true
                    }
                }
                else {
                    return {
                        emailAddress: email.emailAddress,
                        isEnabled: email.isEnabled
                    }
                }

            })
        })
    }

    showOnlyEnabled = () => {
        this.setState({
            showOnlyEnabled: !this.state.showOnlyEnabled,
            emailListEnabled: this.state.emailList.filter((email) => email.isEnabled)
        })
    }

    searchUsers = (ev) => {
        ev.preventDefault();
        if (this.fileInput.value !== '') {
          this.setState({
            isSearchOpen: true,
            showOnlyEnabled: false
          });
        }
        if (this.fileInput.value === '') {
          this.setState({
            isSearchOpen: false,
            showOnlyEnabled: false
          });
        }
        let filterUsers = this.state.emailList;
        filterUsers = filterUsers.filter((user) => {
          let userDetails = user.emailAddress.toLowerCase()
          return userDetails.indexOf(
            ev.target.value.toLowerCase()) !== -1
        });
        this.setState({
          searchUsers: filterUsers
        })
      };


    render() {
        const { emailList, emailListEnabled, showOnlyEnabled, isSearchOpen, searchUsers } = this.state
        return (
            <div className="email">
                <div className="form-container">
                    <div className="part-1">

                        <div className="form-sub-container">
                            <label className="sub-text">Email Address</label>
                            <input type="text" onChange={this.handleChange} name="emailAddress" className="input" value={this.state.emailAddress} />
                        </div>

                    </div>

                    <div className="btn-container">
                        <button className="add-btn" onClick={this.handleAddToList} disabled={this.state.emailAddress.length === 0}>Add</button>
                    </div>
                </div>
                <div className="content-list">
                    <div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                        <div style={{fontSize: '18px', width: '85px', backgroundColor: "#cccc", height: '32px', display: 'flex', justifyContent: 'center', alignItems: "center"}}>Search</div>
                        <input type="text" onChange={this.searchUsers} name="emailAddress" className="input" ref={ref => (this.fileInput = ref)} s/>
                        </div>
                        <div style={{marginBottom: '20px'}}><input type="checkbox" name="show" onClick={this.showOnlyEnabled} />Show Only Enabled</div>
                        <table responsive>
                            <thead>
                                <tr>
                                    <th>Is Enabled</th>
                                    <th>Email Address</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isSearchOpen && !showOnlyEnabled && emailList.map((list, index) =>
                                    <tr>
                                        <td><input type="checkbox" name={`isEnabled${index}`} value={list.isEnabled}
                                            checked={list.isEnabled} onClick={() => this.handleIsEnabled(index)} /></td>
                                        <td>{list.emailAddress}</td>
                                        <td><i className="fa fa-trash" onClick={() => this.handleRemove(index)} style={{ cursor: "pointer" }} /></td>
                                    </tr>
                                )}
                                {showOnlyEnabled && emailListEnabled.map((list, index) =>
                                    <tr>
                                        <td><input type="checkbox" name={`isEnabled${index}`} value={list.isEnabled}
                                            checked={list.isEnabled} onClick={() => this.handleIsEnabled(index)} /></td>
                                        <td>{list.emailAddress}</td>
                                        <td><i className="fa fa-trash" onClick={() => this.handleRemove(index)} style={{ cursor: "pointer" }} /></td>
                                    </tr>
                                )}
                                {isSearchOpen && searchUsers.map((list, index) =>
                                    <tr>
                                        <td><input type="checkbox" name={`isEnabled${index}`} value={list.isEnabled}
                                            checked={list.isEnabled} onClick={() => this.handleIsEnabled(index)} /></td>
                                        <td>{list.emailAddress}</td>
                                        <td><i className="fa fa-trash" onClick={() => this.handleRemove(index)} style={{ cursor: "pointer" }} /></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Email;

