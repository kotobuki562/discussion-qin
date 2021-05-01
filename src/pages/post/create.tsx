import React, { useState } from "react";
import { supabase } from "../../util/supabase";
import { format, formatISO } from "date-fns";
import { InputForm } from "../../components/Input/Input";
import { Layout } from "../../components/Layout";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const today = formatISO(new Date());

  const inputValues = [
    {
      type: "text",
      name: "name",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "お名前は？🤔",
    },
    {
      type: "text",
      name: "title",
      value: title,
      onChange: (e) => setTitle(e.target.value),
      placeholder: "お題タイトル",
    },
    {
      textArea: true,
      type: "text",
      name: "text",
      value: text,
      onChange: (e) => setText(e.target.value),
      placeholder: "お題の詳細文",
    },
  ];

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
  return (
    <Layout>
      <div className="bg-red-200 flex flex-col items-center">
        <InputForm inputs={inputValues} />
        <button
          onClick={() => {
            createPost();
          }}
        >
          送信
        </button>
      </div>
    </Layout>
  );
};

export default CreatePost;
