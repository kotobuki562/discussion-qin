import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "../Button/Button";
import { formatISO } from "date-fns";
import { supabase } from "../../util/supabase";
import { InputForm } from "../../components/Input/Input";
import { useRouter } from "next/router";

export const ModalForm = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        router.reload();
      });
  };
  return (
    <div>
      <Button btnText="お題作成" size="md" useage="base" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ディスカッションのお題作成</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createPost}>
            <ModalBody>
              <InputForm inputs={inputValues} />
            </ModalBody>

            <ModalFooter>
              <div className="mr-4">
                <Button
                  btnText="キャンセル"
                  size="sm"
                  useage="delete"
                  onClick={onClose}
                />
              </div>
              <div>
                <Button
                  size="sm"
                  useage={!text || !title || !name ? null : "base"}
                  btnText="送信"
                  type="submit"
                  disabled={!name || !title || !text}
                  // onClick={onOpen}
                />
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
