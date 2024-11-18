import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { LabelRow } from "../../forms/LabelRow";
import { Category } from "../../../lib/api-sdk/types/entities";
import { CategorySelectOption } from "../../pages/spendTrackers/AddSpendTrackerPage/components/CategorySelectOption";
import { IntervalSelectOption } from "../../pages/spendTrackers/AddSpendTrackerPage/components/IntervalSelectOption";
import { ButtonRow } from "../../ButtonRow";

export const SpendingTrackerFormSchema = z.object({
  spendLimit: z.number().gt(0),
  categoryId: z.string(),
  interval: z.enum(["week", "month"]),
});

export type SpendingTrackerFormValues = z.infer<
  typeof SpendingTrackerFormSchema
>;

interface SpendingTrackerFormProps {
  defaultValues?: SpendingTrackerFormValues;
  categories: Category[];
  onSubmit: (values: SpendingTrackerFormValues) => void;
  submitLabel?: string;
}

export const SpendingTrackerForm = (props: SpendingTrackerFormProps) => {
  const submitLabel = props.submitLabel ?? "Submit";

  const { register, handleSubmit, control, formState } =
    useForm<SpendingTrackerFormValues>({
      defaultValues:
        props.defaultValues === undefined
          ? {
              spendLimit: 0,
              categoryId: undefined,
              interval: "week",
            }
          : props.defaultValues,
      resolver: zodResolver(SpendingTrackerFormSchema),
    });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="px-8">
        <LabelRow label="Spend Limit (eg $24)" />
        <div className="py-2">
          <input
            {...register("spendLimit", { valueAsNumber: true })}
            className="px-4 py-2 border-solid border-b-2 border-b-neutral-900"
          />
        </div>
        <div className="h-8 flex items-center justify-start">
          {formState.errors.spendLimit !== undefined && (
            <span className="text-red-500">
              {formState.errors.spendLimit.message}
            </span>
          )}
        </div>
      </div>
      <div className="px-8 py-4 flex">
        <div className="flex-grow flex items-center justify-start">
          <span className="text-xl font-bold">Category</span>
        </div>
      </div>
      <div className="px-8 pb-8 flex flex-col space-y-2">
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => {
            return (
              <>
                {props.categories.map((category) => {
                  return (
                    <button
                      type="button"
                      key={category.id}
                      onClick={() => {
                        field.onChange(category.id);
                      }}
                    >
                      <CategorySelectOption
                        category={category}
                        isSelected={field.value === category.id}
                      />
                    </button>
                  );
                })}
              </>
            );
          }}
        />
        <div className="h-8 flex items-center justify-start">
          {formState.errors.categoryId !== undefined && (
            <span className="text-red-500">
              {formState.errors.categoryId.message}
            </span>
          )}
        </div>
      </div>
      <Controller
        name="interval"
        control={control}
        render={({ field }) => {
          return (
            <div className="px-8">
              <LabelRow label="How Often?" />
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    field.onChange("week");
                  }}
                >
                  <IntervalSelectOption
                    label="Every Week"
                    isSelected={field.value === "week"}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    field.onChange("month");
                  }}
                >
                  <IntervalSelectOption
                    label="Every Month"
                    isSelected={field.value === "month"}
                  />
                </button>
              </div>
            </div>
          );
        }}
      />
      <div className="px-8">
        <button type="submit" className="w-full">
          <ButtonRow label={submitLabel} />
        </button>
      </div>
    </form>
  );
};
