import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react'


const Postcard = ({ post: { body, createdAt, id, username, likesCount, commentsCount } }) => {
  const timestamp = moment(createdAt).fromNow()
  
  function likePost() {

  }

  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Link to={`/posts/${id}`}>
          <Card.Meta>{timestamp}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Link>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost} >
          <Button color='red' size='mini'>
            <Icon name='heart' />
              Like
            </Button>
          <Label as='a' basic color='red' pointing='left'>
            {likesCount}
      </Label>
        </Button>
        <Button as='div' position='right' labelPosition='right' onClick={likePost} >
          <Button color='blue' size='mini'>
            <Icon name='comments' />
              comments
            </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentsCount}
      </Label>
        </Button>
      </Card.Content>
    </Card>
  )

};

export default Postcard;