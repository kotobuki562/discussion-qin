import { useState, useEffect } from "react";
import { supabase } from "../util/supabase";
import { Layout } from "../components/Layout";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPost = () => {
    const postRef = supabase.from("posts").select("*");
    return postRef.then((data) => {
      setPosts(data.body);
    });
  };

  useEffect(() => {
    fetchPost();
    return () => {
      fetchPost();
    };
  }, []);

  return (
    <Layout>
      <div>
        <div className="bg-blue-200 flex flex-col items-center">
          {posts.map((post) => {
            return (
              <div key={post.id}>
                <p>{post.name}</p>
                <p>{post.title}</p>
                <p>{post.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
