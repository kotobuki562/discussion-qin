import { VFC, useEffect, useState } from "react";
import { icons } from "../../../public/icon";
import { Button } from "../Button/Button";
import { useRouter } from "next/router";
import { supabase } from "../../util/supabase";
import cc from "classcat";

type CardInfo = {
  id: number;
  name: string;
  title: string;
  text: string;
  checkState: boolean;
};

export const Card: VFC<CardInfo> = ({ id, name, title, text, checkState }) => {
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

  return (
    <div
      key={id}
      className={cc([
        "border-2 m-2 p-2 rounded-2xl",
        checkState ? "bg-gray-200" : null,
      ])}
    >
      <div className="flex items-center">
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
        className="flex flex-col items-center w-full focus:outline-none"
      >
        <img
          className="w-36"
          src={checkState ? icons.closeIcon : icons.openIcon}
          alt={checkState ? "close" : "open"}
        />
      </button>
      <div>
        {/* <Button
          btnText={checkState ? "open" : "close"}
          useage="base"
          size="sm"
          onClick={checkCard}
        /> */}
        <p>{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};
