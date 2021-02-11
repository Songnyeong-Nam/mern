import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation} from '@apollo/client'
import {useForm} from '../hooks/useForm'

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id
        body
        createdAt
        username
        likes{
            id
            username
            createdAt
        }
        likesCount
        commentsCount
        commnets{
            id
            username
            body
            createdAt
        }
    }
}
`

const PostForm = () => {
    const {values, onChange, onSubmit} = useForm(createPostCallback,{
        body:''
    })
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(_,result){
            values.body=''
        }
    })
    function createPostCallback () {
        createPost()
    }
    return (
        <Form onSubmit={onSubmit}>
            <h2></h2>
            <Form.Field>
                <Form.Input 
                placeholder='??'
                name='body'
                onChange={onChange}
                value={values.body}/>
            </Form.Field>
            <Button color='blue'>Post</Button>
        </Form>
    );
};

export default PostForm;