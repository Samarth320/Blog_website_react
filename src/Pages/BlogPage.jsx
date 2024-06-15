import React, { useContext, useEffect, useState } from 'react'
import BlogDetails from '../components/BlogDetails';
import Header from '../components/Header';
import { baseUrl } from '../baseUrl';
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from 'react-router-dom';

const BlogPage = () => {

  const [blog , setBlog] = useState(null);
  const [relatedblogs , setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {setLoading , loading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs()
  {
    setLoading(true);
    let url = `${baseUrl}?blogId=${blogId}`;

    try{
      const res = await fetch(url);
      const data = await res.json();

      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    }
    catch(error)
    {
      console.log("error aaya gaya blog id ki call karte samay");
      setBlog(null);
      setRelatedBlogs([]);
    }

    setLoading(false);
  }

  useEffect( ()=> {
    if(blogId)
      {
        fetchRelatedBlogs();
      }
  },[location.pathname])


  return (
    <div>
        <Header/>

        <div>
          <button onClick={()=> navigate(-1)}>
              Back
          </button>
        </div>

        {
          loading ? ( <div> <p>Loading</p> </div> ) : blog ?
                                                      (<div>
                                                        <BlogDetails post={blog} />
                                                        <h2>Related Blogs</h2>
                                                        {
                                                          relatedblogs.map( (Eachpost)=>{
                                                            return <div key={Eachpost.id}>
                                                                    <BlogDetails post={Eachpost} />
                                                                   </div>
                                                          }
                                                          )
                                                        }
                                                      </div>)  :

                                                      (<div>
                                                        <p>No Blog Found</p>
                                                      </div>) 

        }
    </div>
  )
}

export default BlogPage