import React, {useContext} from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { Grid } from "semantic-ui-react";
import PostCard from '../components/Postcard'
import PostForm from '../components/PostForm'
import { AuthContext } from "../context/auth";

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      commentsCount
      commnets {
        id
        body
        createdAt
        username
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

const Home = () => {
    const {user} = useContext(AuthContext)
  const {
    loading,
    data,
  } = useQuery(FETCH_POSTS);

  return (
    <>
      <Grid columns={3} divided>
        <Grid.Row >
          <h1> recent posts </h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm/>
            </Grid.Column>
          )}
          {loading && <h1>Loading...</h1>}
          {data && data.getPosts && 
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post}/>
            </Grid.Column>
          ))}
        </Grid.Row>


      </Grid>
    </>
  );
};

export default Home;
