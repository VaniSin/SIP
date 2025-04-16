import React, { useState } from 'react';

const ForumSection = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Best practices for organic pest control?',
      author: 'RameshFarmer',
      date: '2025-04-10',
      content: 'I\'m looking for effective organic methods to control pests in my vegetable garden. Chemical pesticides are damaging the soil quality. Any suggestions?',
      likes: 15,
      comments: [
        {
          id: 1,
          author: 'OrganicGuru',
          date: '2025-04-11',
          content: 'Neem oil works great for most pests. Mix 2ml in 1 liter of water with a drop of dish soap and spray weekly.'
        },
        {
          id: 2,
          author: 'GreenThumb',
          date: '2025-04-12',
          content: 'Try companion planting! Marigolds repel many pests and attract beneficial insects.'
        }
      ]
    },
    {
      id: 2,
      title: 'Irrigation system recommendations for 5-acre farm',
      author: 'SureshAgro',
      date: '2025-04-08',
      content: 'I need to set up an efficient irrigation system for my 5-acre farm in Gujarat. Currently growing wheat and considering vegetables next season. Budget is around ₹50,000. Any recommendations?',
      likes: 8,
      comments: [
        {
          id: 1,
          author: 'WaterWise',
          date: '2025-04-09',
          content: 'Drip irrigation would be your best bet for water efficiency. Check out the RainDrop system from Agrimart.'
        }
      ]
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });
  
  const [newComment, setNewComment] = useState({
    postId: null,
    content: ''
  });
  
  const [activePost, setActivePost] = useState(null);
  
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };
  
  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      content: e.target.value
    });
  };
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (newPost.title.trim() === '' || newPost.content.trim() === '') return;
    
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      author: 'CurrentUser', // Would be replaced with actual user info
      date: new Date().toISOString().split('T')[0],
      content: newPost.content,
      likes: 0,
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '' });
  };
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (newComment.content.trim() === '' || !newComment.postId) return;
    
    const comment = {
      id: Math.max(...posts.find(p => p.id === newComment.postId).comments.map(c => c.id), 0) + 1,
      author: 'CurrentUser', // Would be replaced with actual user info
      date: new Date().toISOString().split('T')[0],
      content: newComment.content
    };
    
    const updatedPosts = posts.map(post => {
      if (post.id === newComment.postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setNewComment({ postId: null, content: '' });
  };
  
  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary text-white p-4">
        <h3 className="text-lg font-semibold">Community Forum</h3>
      </div>
      
      <div className="p-4">
        <form onSubmit={handlePostSubmit} className="mb-6 border-b pb-6">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Create a New Post</h4>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handlePostChange}
              placeholder="What's your question or topic?"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={newPost.content}
              onChange={handlePostChange}
              placeholder="Describe your question or share your knowledge..."
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Post to Forum
          </button>
        </form>
        
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{post.title}</h4>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>Posted by {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center text-gray-500 hover:text-primary transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setActivePost(activePost === post.id ? null : post.id);
                        setNewComment({ postId: post.id, content: '' });
                      }}
                      className="flex items-center text-gray-500 hover:text-primary transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                    className="text-accent hover:text-primary transition"
                  >
                    {activePost === post.id ? 'Hide Comments' : 'View Comments'}
                  </button>
                </div>
              </div>
              
              {activePost === post.id && (
                <div className="bg-gray-50 p-4 border-t">
                  <h5 className="text-md font-medium text-gray-700 mb-3">Comments</h5>
                  
                  {post.comments.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="bg-white p-3 rounded border">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <span>{comment.author}</span>
                            <span className="mx-2">•</span>
                            <span>{comment.date}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
                  )}
                  
                  <form onSubmit={handleCommentSubmit}>
                    <div className="flex">
                      <input
                        type="text"
                        value={newComment.content}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumSection;
