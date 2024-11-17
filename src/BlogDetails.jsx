import React from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from './usefetch';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('db.json' + id)
    const history = useHistory();
    const handleClick = async (event) => {
      event.preventDefault();
    
      try {
        await fetch('db.json' + blog.id, {
          method: 'DELETE',
        });
        history.push('/');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    };
  return (
    <div className='blog-details'>
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { blog && (
            <article>
                <h2>{ blog.title }</h2>
                <p>written by { blog.author }</p>
                <div>{ blog.body }</div>
                { blog && <button onClick={handleClick}>delete</button> }
            </article>
        )}
    </div>
  )
}

export default BlogDetails;
