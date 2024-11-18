import classNames from "classnames";

interface SpendingTrackerProgressBar {
  spendLimit: number;
  totalSpent: number;
  size?: "sm" | "lg";
}

export const SpendingTrackerProgressBar = (
  props: SpendingTrackerProgressBar
) => {
  const size = props.size || "lg";
  const progressBarFillPercentage = Math.ceil(
    (props.totalSpent / props.spendLimit) * 100
  );

  return (
    <div className="w-full px-8">
      <div
        className={classNames([
          "w-full bg-slate-300 flex rounded-full overflow-clip",
          {
            "h-8": size === "lg",
            "h-4": size === "sm",
          },
        ])}
      >
        <div
          style={{
            width: `${progressBarFillPercentage > 100 ? 100 : progressBarFillPercentage}%`,
          }}
          className={classNames([
            "flex-initial h-full",
            {
              "bg-red-500": progressBarFillPercentage > 100,
              "bg-green-500": progressBarFillPercentage <= 100,
            },
          ])}
        />
      </div>
    </div>
  );
};
