const { UserInputError } = require('apollo-server');
const Post = require('../../modules/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body}, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === '') {
                throw new UserInputError('Empty Comment',{
                    errors: {
                        body: "text required"
                    }
                })
            }
            const post = await Post.findById(postId);
            if(post){
                post.commnets.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            } else throw new Error('Unvaild User')
        },
        deleteComment: async (_,{ postId, commnetId }, context) => {
            const user = checkAuth(context)
            const comment = Post.commnets.findById(commnetId)
            // if(){

            // }
        }
    }
}