import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { Grid } from "semantic-ui-react";
import PostCard from '../components/Postcard'

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
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
