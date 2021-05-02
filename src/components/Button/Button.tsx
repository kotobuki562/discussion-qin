import { VFC, MouseEventHandler } from "react";
import { Spinner } from "@chakra-ui/react";
import cc from "classcat";

type Btninfo = {
  btnText: string;
  useage: "delete" | "base";
  size: "sm" | "md" | "lg";
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
export const Button: VFC<Btninfo> = (props) => {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      className={cc([
        "flex items-center font-semibold tracking-wide rounded-full transition duration-200 hover:text-white dark:hover:text-dark focus:outline-none",
        props.size === "sm" ? "border-2 px-4 py-2 text-sm sm:text-base" : null,
        props.size === "md" ? "border-2 px-4 py-2 text-base sm:text-lg" : null,
        props.size === "lg" ? "border-2 px-4 py-2 text-lg sm:text-xl" : null,
        props.useage === "base"
          ? "border-teal-400 text-teal-400 hover:bg-teal-400"
          : null,
        props.useage === "delete"
          ? "border-red-500 text-red-500 hover:bg-red-500"
          : null,
        props.disabled
          ? "border-gray-300 text-gray-300 hover:bg-gray-300"
          : null,
      ])}
    >
      {props.isLoading ? <Spinner /> : props.btnText}
    </button>
  );
};
