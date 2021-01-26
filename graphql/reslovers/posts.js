const Post = require("../../modules/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const all = await Post.find();
        return all;
      } catch (err) {
        throw new Error(err);
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
      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
  },
};

// to prevent closing the whole server due to query mistake
