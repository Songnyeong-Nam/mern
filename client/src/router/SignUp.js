import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import {AuthContext} from '../context/auth'
import {useForm} from '../hooks/useForm'

const SignUp = ({history}) => {
    const context = useContext(AuthContext)
    const [errmsg, setErrmsg] = useState('')

    const {onSubmit, onChange, values} = useForm(signupUser, {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
    })

    const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ){
            register(
                registerInput: {
                    username: $username
                    password: $password
                }
            ){
                id email username createdAt 
            }
        }
    `
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, {data: {register:{userData}}}) {
            console.log(userData)
            context.login(userData)
            history.push('/')
        },
        onError(err) {
            setErrmsg(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function signupUser () {
        addUser()
    }
    
    return (
        <>
            <div className='form-container flex-box'>
                <Form onSubmit={onSubmit}
                    noValidate
                    className={loading ? 'loading' : ''}>
                    <h1>Sign Up</h1>
                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        name="username"
                        type='text'
                        value={values.username}
                        error={errmsg.username? true: false}
                        onChange={onChange} />
                    <Form.Input
                        label="email"
                        placeholder="email"
                        name="email"
                        type='email'
                        value={values.email}
                        error={errmsg.email? true: false}
                        onChange={onChange} />
                    <Form.Input
                        label="password"
                        placeholder="password"
                        name="password"
                        type='password'
                        value={values.password}
                        error={errmsg.password? true: false}
                        onChange={onChange} />
                    <Form.Input
                        label="confirmPassword"
                        placeholder="confirmPassword"
                        name="confirmPassword"
                        type='password'
                        value={values.confirmPassword}
                        error={errmsg.confirmPassword? true: false}
                        onChange={onChange} />
                    <Button type="submit" primary>Submit</Button>
                </Form>
                {Object.keys(errmsg).length > 0 &&
                    <div className="ui error message">
                        <ul className='list'>
                            {console.log(errmsg)}
                            {Object.values(errmsg).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>}
            </div>
        </>
    );
};

export default SignUp;