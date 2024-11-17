import classNames from "classnames";

interface ButtonRowProps {
  label: string;
  isDisabled?: boolean;
}

export const ButtonRow = (props: ButtonRowProps) => {
  return (
    <div className="py-4">
      <div
        className={classNames([
          "rounded-full w-full py-4 px-8 text-center",
          {
            "bg-slate-300 text-black": props.isDisabled !== true,
            "bg-slate-300 bg-opacity-15 text-neutral-400":
              props.isDisabled === true,
          },
        ])}
      >
        <span className="font-bold">{props.label}</span>
      </div>
    </div>
  );
};
