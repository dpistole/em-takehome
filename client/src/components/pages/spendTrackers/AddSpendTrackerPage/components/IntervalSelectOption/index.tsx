import classNames from "classnames";

interface IntervalSelectOptionProps {
  label: string;
  isSelected?: boolean;
}

export const IntervalSelectOption = (props: IntervalSelectOptionProps) => {
  const isSelected = props.isSelected || false;

  return (
    <div
      className={classNames([
        "rounded-full p-4 flex items-center justify-center",
        {
          "bg-black text-white": isSelected === true,
          "bg-white text-black": isSelected === false,
        },
      ])}
    >
      {props.label}
    </div>
  );
};
