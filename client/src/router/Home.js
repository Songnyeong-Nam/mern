import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { Grid, Breadcrumb } from "semantic-ui-react";

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
    data: { getPosts },
  } = useQuery(FETCH_POSTS);

  return (
    <>
      <Grid columns={3} divided>
        {loading && <h1>Loading...</h1>}
        {getPosts && 
          <>
            <Grid.Row>
              <h1> recent posts </h1>
            </Grid.Row>
            <Grid.Row>
              {getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <Breadcrumb post={post} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </>
        }
      </Grid>
    </>
  );
};

export default Home;
