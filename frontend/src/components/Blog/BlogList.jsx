import React from 'react';
import BlogItem from './BlogItem';

const BlogList = ({ blogs, onEdit, onDelete, canEdit, currentUserId }) => {
    return (
        <div>
            {blogs.length === 0 ? (
                <p>No blogs found. Be the first to create one!</p>
            ) : (
                blogs.map(blog => (
                    <BlogItem
                        key={blog._id}
                        blog={blog}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        canEdit={canEdit && (blog.author._id === currentUserId)}
                    />
                ))
            )}
        </div>
    );
};

export default BlogList;