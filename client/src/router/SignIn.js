import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import {AuthContext} from '../context/auth'
import { useForm } from '../hooks/useForm'

const SignIn = ({history}) => {
    const [errmsg, setErrmsg] = useState('')
    const context = useContext(AuthContext)

    const { onChange, onSubmit, values } = useForm(SigninUser, {
        username: '',
        password: '',
    })

    const SIGNIN_USER = gql`
        mutation login(
                $username: String!
                $password: String!
            ){
                login(
                    username: $username
                    password: $password
                )
            {
                id email username createdAt token
            }
            }
        
    `
    const [loginUser, { loading }] = useMutation(SIGNIN_USER, {
        update(_, {data: {login: userData}}) {
            context.login(userData)
            history.push('/')
        },
        onError(err) {
            setErrmsg(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function SigninUser() {
        loginUser()
    }
    return (
        <>
            <div className='form-container flex-box'>
                <Form onSubmit={onSubmit}
                    noValidate
                    className={loading ? 'loading' : ''}>
                    <h1>Sign In</h1>
                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        name="username"
                        type='text'
                        value={values.username}
                        error={errmsg.username ? true : false}
                        onChange={onChange} />
                    <Form.Input
                        label="password"
                        placeholder="password"
                        name="password"
                        type='password'
                        value={values.password}
                        error={errmsg.password ? true : false}
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

export default SignIn;