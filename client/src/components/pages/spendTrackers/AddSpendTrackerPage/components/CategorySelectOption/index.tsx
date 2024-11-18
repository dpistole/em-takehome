import classNames from "classnames";
import { Category } from "../../../../../../lib/api-sdk/types/entities";

interface CategorySelectOptionProps {
  category: Category;
  isSelected?: boolean;
}

export const CategorySelectOption = (props: CategorySelectOptionProps) => {
  return (
    <div
      key={props.category.id}
      className={classNames([
        "p-2 flex items-center justify-start border border-solid border-neutral-400",
        {
          "bg-black text-white": props.isSelected === true,
          "bg-white text-black": props.isSelected === false,
        },
      ])}
    >
      <span className="text-bold">{props.category.name}</span>
    </div>
  );
};
