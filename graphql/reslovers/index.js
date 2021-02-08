const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentsResolvers = require('./comments')

module.exports = {
  Post:{
    likesCount: (parent) => parent.likes.length,
    commentsCount:(parent) => parent.commnets.length
  },
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription
  }
};
