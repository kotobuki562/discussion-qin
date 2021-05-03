import { VFC, useEffect, useState } from "react";
import { icons } from "../../../public/icon";
import { Button } from "../Button/Button";
import { useRouter } from "next/router";
import { supabase } from "../../util/supabase";
import usePost from "../../services/posts";
import { DeleteIcon } from "@chakra-ui/icons";
import cc from "classcat";

type CardInfo = {
  id: number;
  name: string;
  title: string;
  text: string;
  checkState: boolean;
};

export const Card: VFC<CardInfo> = ({ id, name, title, text, checkState }) => {
  const [readMore, setReadMore] = useState(false);
  const router = useRouter();
  const checkCard = async () => {
    if (checkState) {
      const checkTrue = await supabase
        .from("posts")
        .update({ check: false })
        .eq("id", id)
        .then((data) => {
          console.log("success false", data.body, id);
          // return router.reload();
        });
    } else {
      const checkFalse = await supabase
        .from("posts")
        .update({ check: true })
        .eq("id", id)
        .then((data) => {
          console.log("success true", data.body, id);
          // return router.reload();
        });
    }
  };

  const deleteCard = async () => {
    const { data, error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div
      key={id}
      className={cc([
        "border-2 m-2 p-4 rounded-2xl",
        checkState ? "bg-gray-200" : null,
      ])}
    >
      <div className="flex items-center mb-4">
        <span
          className={cc([
            "mr-4 w-10 h-10 flex flex-col items-center justify-center rounded-full text-white font-semibold text-lg",
            checkState ? "bg-blue-400" : "bg-yellow-400",
          ])}
        >
          {name.slice(0, 1)}
        </span>
        <p>{name}</p>
      </div>
      <button
        onClick={checkCard}
        className="w-full flex flex-col items-center mb-4 focus:outline-none"
      >
        <img
          className="w-36"
          src={checkState ? icons.closeIcon : icons.openIcon}
          alt={checkState ? "close" : "open"}
        />
      </button>
      <div>
        <div className="flex items-center mb-4">
          <p className="mr-4">{title}</p>
          <Button
            btnText={<DeleteIcon />}
            useage="delete"
            size="xs"
            onClick={deleteCard}
          />
        </div>

        <p>
          {readMore ? text : `${text.substring(0, 30)}...`}
          <Button
            onClick={() => setReadMore(!readMore)}
            btnText={readMore ? "閉じる" : "もっと表示"}
            useage={readMore ? "delete" : "base"}
            size="xs"
          />
        </p>
        {/* <Button  /> */}
      </div>
    </div>
  );
};
