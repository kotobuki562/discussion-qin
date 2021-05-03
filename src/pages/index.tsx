import { useState, useEffect } from "react";
import { supabase } from "../util/supabase";
import { Layout } from "../components/Layout";
import { Card } from "../components/Card/Card";
import usePost from "../services/posts";
import { Button } from "../components/Button/Button";

const Home = () => {
  const { loading, posts, increaseLimit } = usePost();

  // console.log(posts);

  // const [posts, setPosts] = useState<any[]>([]);
  // const [check, setCheck] = useState<boolean>();

  // const fetchPost = () => {
  //   const postRef = supabase.from("posts").select("*").order("createAt");
  //   postRef.then((data) => {
  //     return setPosts(data.body);
  //   });
  // };

  // useEffect(() => {
  //   fetchPost();
  //   return () => {
  //     fetchPost();
  //   };
  // }, []);

  return (
    <Layout>
      <div className="w-full px-4">
        <div className="w-full flex flex-col items-center">
          {/* <Button
            btnText="次の3件"
            onClick={increaseLimit}
            useage="base"
            size="md"
          /> */}
          <div className="grid xs:grid-cols-3 md:grid-cols-4">
            {posts?.map((post) => {
              return (
                <Card
                  key={post.id}
                  id={post.id}
                  name={post.name}
                  title={post.title}
                  text={post.text}
                  checkState={post.check}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
