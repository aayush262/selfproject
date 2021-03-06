import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";


const defaultForm = {
    name: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    gender: '',
    dob: '',
    address: ''
}
export  class RegisterComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm,
            },
            error: {
                ...defaultForm,
            
                
            },
            isSubmitting: false,
            isValidForm: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }
    validateForm(fieldName) {
        let err;
        switch (fieldName) {
            case 'username':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 6
                        ? ''
                        : 'Username must be 6 characters'
                    : 'Username is required'
                break;
            case 'password':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 6
                        ? ''
                        : 'Weak Password'
                    : 'Password is required'
                break;
            case 'email':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].includes('@')
                        ? ''
                        : 'Invalid Email'
                    : 'Email is required'
                break;
            default:
                break;
        }

        this.setState((pre) => ({
            error: {
                ...pre.error,
                [fieldName]: err
            }
        }), () => {
            const { error } = this.state;
            const errors = Object
                .values(error)
                .filter(err => err);
            console.log('error is >>', errors);
          
            let isValidForm = errors.length === 0;
            this.setState({
                isValidForm
            });
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        });
        // setTimeout(()=>{
        //     this.setState({
        //         isSubmitting:false
        //     });
        // },2000)
            axios.post
            ("http://localhost:2020/api/auth/register",        
              this.state.data,{
                headers:{
                    "Content-Type":"application/json",
                },
                params:{},
                responseType:"json"
            })
            .then(data=>{
                console.log("success in axios register>>",data);
                this.props.history.push("/")
            })
            .catch(err=>{
                console.log("error handle properly>>",err);
            })
            

    };

    render() {
      
        let btn = this.state.isSubmitting
            ?
             <button className="btn btn-info" disabled={true}>submitting</button>
            :
             <button className="btn btn-success" disabled={!this.state.isValidForm} type="submit">Submit</button>
        return (
            <div>
                <h2>Register</h2>
                <p>Please register here</p>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="name" className="form-control" onChange={this.handleChange}></input>
                    <label>Email</label>
                    <input type="text" placeholder="Email" name="email" className="form-control" onChange={this.handleChange}></input>
                    <p className="danger">{this.state.error.email}</p>
                    <label>Address</label>
                    <input type="text" placeholder="Address" name="address" className="form-control" onChange={this.handleChange}></input>
                    <label>Username</label>
                    <input type="text" placeholder="Username" name="username" className="form-control" onChange={this.handleChange}></input>
                    <p className="danger">{this.state.error.username}</p>
                    <label>Password</label>
                    <input type="password" placeholder="*******" name="password" className="form-control" onChange={this.handleChange}></input>
                    <p className="danger">{this.state.error.password}</p>
                    <label>Gender</label>
                    <br></br>
                    <input type="radio" name="gender" value="male" onChange={this.handleChange}></input> Male
                    <br />
                    <input type="radio" name="gender" value="female" onChange={this.handleChange}></input> Female
                    <br />

                    <input type="radio" name="gender" value="others" onChange={this.handleChange}></input> Others
                    <br />
                    <label>Date Of Birth</label>
                    <input type="date" name="dob" className="form-control" onChange={this.handleChange}></input>
                    <br></br>
                    {btn}
                </form>
                <p>Already Registered</p>
                <p >Back to <Link to="/">login</Link> </p>

            </div>
        )
    }
}