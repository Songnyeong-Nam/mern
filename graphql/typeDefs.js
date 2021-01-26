const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    commnets: [Comment]!
    commentsCount: Int!
    likes:[Like]!
    likesCount: Int!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getUser(userId: ID!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Comment!
    deleteComment(postId: ID!, commetnId: ID!): String!
    createLike(postId: ID!): Like!
  }
  type Subscription{
    newPost: Post!
  }
`;
