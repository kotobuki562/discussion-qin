import type { VFC, ChangeEventHandler, ReactNode } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
} from "@chakra-ui/react";

type Input = {
  inputs: {
    name: string;
    type: string;
    value: string | number | readonly string[];
    onChange: ChangeEventHandler;
    leftIcon?: ReactNode;
    placeholder?: string;
    select?: boolean;
    selectValue?: string[];
    textArea?: boolean;
    textAreaValue?: string;
    required?: boolean;
  }[];
};

export const InputForm: VFC<Input> = ({ inputs }) => {
  return (
    <div>
      {inputs.map((props) => (
        <label className="flex flex-col mb-4" key={props.name}>
          <span>{props.name}</span>
          <InputGroup>
            {props.leftIcon ? (
              <InputLeftElement
                pointerEvents="none"
                children={props.leftIcon}
              />
            ) : null}
            {props.select ? (
              <Select
                focusBorderColor="gray.300"
                placeholder={props.placeholder}
                value={props.value}
                className="bg-opacity-0 py-1 px-2 w-full rounded border border-fontDark outline-none shadow-none"
                onChange={props.onChange}
              >
                {props.selectValue.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Select>
            ) : null}
            {props.textArea ? (
              <Textarea
                value={props.value}
                placeholder={props.placeholder}
                _focus={{ outline: "none" }}
                className="bg-opacity-0 py-1 px-2 w-full rounded border border-fontDark shadow-none"
                onChange={props.onChange}
              />
            ) : (
              <Input
                focusBorderColor="gray.300"
                _focus={{ outline: "none" }}
                className="bg-opacity-0 py-1 px-2 w-full rounded border border-fontDark shadow-none"
                onChange={props.onChange}
                {...props}
              />
            )}
          </InputGroup>
        </label>
      ))}
    </div>
  );
};
