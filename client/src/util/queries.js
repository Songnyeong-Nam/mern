import gql from "graphql-tag";

export const FETCH_POSTS = gql`
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

export const CREATE_POST_MUTATION = gql`
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
