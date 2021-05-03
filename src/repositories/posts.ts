import { supabase } from "../util/supabase";
import Post from "../models/posts";

const postsRef = supabase.from("posts");

export const getPosts = postsRef
  .on("*", (msg) => console.log("*", msg))
  .subscribe();
// ).select("*").order("createAt");
