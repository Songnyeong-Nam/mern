const {AuthenticationError} = require('apollo-server')

const Post = require("../../modules/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const all = await Post.find().sort({createdAt: -1});
        return all;
      } catch (err) {
        throw new Error(` getPosts err ${err}`);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {    
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (args.body.trim() === ''){
        throw new Error('Post body must not be empty')
      }
      
      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      context.pubsub.publish('NEW_POST', {
        newPost: post
      })
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try{
        const one = await Post.findById(postId);
        if(one.username === user.id){
          await one.delete(one.id)
          return `Post deleted Successfully`
        } else{
          throw new AuthenticationError(`Action not allowed`)
        }

      } catch{
        throw new Error(`coundn't find the post`)
      }
    },
    
  },
  Subscription: {
    newPost: {
      subscribe: (_,__,{ pubsub }) => pubsub.asyncIterator('NEW_POST') 
    }
  }
};

// to prevent closing the whole server due to query mistake
