import React, { useState } from "react";
import { supabase } from "../../util/supabase";
import { formatISO } from "date-fns";
import { InputForm } from "../../components/Input/Input";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/Button/Button";

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
      required: true,
      onChange: (e) => setName(e.target.value),
      placeholder: "お名前",
    },
    {
      type: "text",
      name: "title",
      value: title,
      required: true,
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

  const createPost = (e) => {
    e.preventDefault();
    supabase
      .from("posts")
      .insert([
        {
          name: name,
          title: title,
          text: text,
          createAt: today,
          updateAt: today,
          check: false,
        },
      ])
      .then((data) => {
        console.log(data.body);
      });
  };
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <form onSubmit={createPost}>
          <InputForm inputs={inputValues} />
          <Button
            size="sm"
            useage={!text || !title || !name ? null : "base"}
            btnText="送信"
            type="submit"
            disabled={!name || !title || !text}
          />
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
