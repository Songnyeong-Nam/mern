import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useForm } from '../hooks/useForm'
import { FETCH_POSTS, CREATE_POST_MUTATION } from '../util/queries'


const PostForm = () => {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const cache = proxy.readQuery({
                query: FETCH_POSTS
            })
            console.log(cache.getPosts)
            console.log(result.data.createPost)
            // cache.getPosts = [result.data.createPost, ...cache.getPosts]
            // console.log(cache.getPosts)
            // console.log(cache)
            proxy.writeQuery({ query: FETCH_POSTS,
                 cache: [result.data.createPost, ...cache.getPosts] })
            values.body = '';
        }
    })
    function createPostCallback() {
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
                    value={values.body} />
            </Form.Field>
            <Button color='blue'>Post</Button>
        </Form>
    );
};

export default PostForm;