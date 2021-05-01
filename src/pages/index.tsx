import { useState, useEffect } from "react";
import { supabase } from "../util/supabase";
import { format, formatISO } from "date-fns";
import { Layout } from "../components/Layout";

const Home = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const today = formatISO(new Date());

  const createPost = async () => {
    try {
      await supabase.from("posts").insert([
        {
          name: name,
          title: title,
          text: text,
          createAt: today,
          updateAt: today,
          check: false,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="bg-red-200 flex flex-col items-center">
          <input
            className="border-2"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border-2"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border-2"
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => {
              createPost();
            }}
          >
            送信
          </button>
        </div>
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
