import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Routes , Route, useSearchParams, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import BlogPage from "./Pages/BlogPage";


export default function App() {

  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams , setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => 
  {
    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags"))
    {
      //iska matlab tag vala page show karna hai
      const tag = location.pathname.split("/").at(-1).replaceAll("-" , " ");
      fetchBlogPosts(Number(page) , tag);
    }
    else if(location.pathname.includes("categories"))
         {
          const category = location.pathname.split("/").at(-1).replaceAll("-" , " ");
          fetchBlogPosts(Number(page) , null , category);
         } 
    else
         {
          fetchBlogPosts(Number(page));
         }

  }, [location.pathname , location.search]);

  return (
    // <>
    //   <Header />
    //   <div className="my-[100px]">
    //     <Blogs />
    //     <Pagination />
    //   </div>
    // </>

    <>
      <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/blog/:blogId" element={<BlogPage/>} />
       <Route path="/tags/:tag" element={<TagPage/>} />
       <Route path="/categories/:category" element={<CategoryPage/>} />
      </Routes>
    </>
    
  );
}
