import { useState, useEffect } from "react";
import { supabase } from "../util/supabase";
import type Post from "../models/posts";
// import Post from "../models/posts";
// import { getPosts } from "../repositories/posts";

// export const usePost = (): [Post[], boolean, Error | null] => {
//   const [values, setValues] = useState<Post[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>();

//   useEffect(() => {
//     const posts = getPosts;
//     console.log(posts);
//   }, [values]);
//   return [values, loading, error];
// };

const usePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [limit, setLimit] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    supabase.from("posts").on("INSERT", handleInsert).subscribe();
  }, [posts]);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("posts")
      .select()
      .order("createAt", { ascending: false })
      // .limit(limit)
      .then((data) => {
        setLoading(false);
        if (!data.error && data.data) {
          data.data.reverse();
          setPosts(data.data);
        }
      });
  }, [limit, posts]);

  const handleInsert = (payload: { new: Post }) => {
    setPosts([...posts, payload.new]);
  };

  const increaseLimit = () => {
    setLimit(limit + 3);
  };

  return { loading, posts, increaseLimit };
};

export default usePost;
