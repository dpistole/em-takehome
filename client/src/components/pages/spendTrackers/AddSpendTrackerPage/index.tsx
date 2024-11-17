import { buildTimeVariables } from "../../../../buildTimeVariables";
import { AppRoutes } from "../../../../constants/AppRoutes";
import { useListCategoriesQuery } from "../../../../lib/api-sdk/hooks/useListCategoriesQuery";
import { ButtonRow } from "../../../ButtonRow";
import { LabelRow } from "../../../forms/LabelRow";
import { Header, HeaderBackLink } from "../../../Header";
import { Controller, useForm } from "react-hook-form";
import { CategorySelectOption } from "./components/CategorySelectOption";
import { IntervalSelectOption } from "./components/IntervalSelectOption";
import { useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewSpendTrackerMutation } from "../../../../lib/api-sdk/hooks/useCreateNewSpendTrackerMutation";
import { useNavigate } from "@tanstack/react-router";

const CreateSpendTrackerFormSchema = z.object({
  spendLimit: z.number().gt(0),
  categoryId: z.string(),
  interval: z.enum(["week", "month"]),
});

type CreateSpendTrackerFormValues = z.infer<
  typeof CreateSpendTrackerFormSchema
>;

export const AddSpendTrackerPage = () => {
  const navigate = useNavigate({
    from: AppRoutes.addSpendTracker.getPath(),
  });

  const listCategoriesQuery = useListCategoriesQuery({
    host: buildTimeVariables.apiHost,
  });

  const createNewSpendTrackerMutation = useCreateNewSpendTrackerMutation({
    host: buildTimeVariables.apiHost,
  });

  const {
    register,
    handleSubmit,
    control,
    formState,
    reset: formReset,
  } = useForm<CreateSpendTrackerFormValues>({
    defaultValues: {
      spendLimit: 0,
      categoryId: undefined,
      interval: "week",
    },
    resolver: zodResolver(CreateSpendTrackerFormSchema),
  });

  const onSubmit = (values: CreateSpendTrackerFormValues) => {
    createNewSpendTrackerMutation.mutate(values);
    navigate({
      to: AppRoutes.index.getPath(),
    });
  };

  const isSubmitDisabled = useMemo(() => {
    if (formState.isDirty === false) {
      return false;
    }

    if (formState.isValid) {
      return false;
    }

    return true;
  }, [formState]);

  // use effect to monitor for successful creation, navigating the user away from the page when complete
  useEffect(() => {
    formReset();
  }, [createNewSpendTrackerMutation.isSuccess, formReset]);

  return (
    <div date-test-id="add-spend-tracker-page" className="bg-white">
      <Header
        leftButton={
          <HeaderBackLink to={AppRoutes.index.getPath()} label="[home]" />
        }
        title="Track Spending"
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {/* <div className="flex-shrink flex items-center justify-end">
              Change
            </div> */}
          </div>
          <div className="px-8 pb-8 flex flex-col space-y-2">
            {listCategoriesQuery.isSuccess && (
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      {listCategoriesQuery.data.map((category) => {
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
            )}{" "}
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
            <button className="w-full" disabled={isSubmitDisabled}>
              <ButtonRow label="Add Tracker" isDisabled={isSubmitDisabled} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
