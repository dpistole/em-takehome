interface LabelRowProps {
  label: string;
}

export const LabelRow = (props: LabelRowProps) => (
  <div className="py-2">
    <span className="text-xl font-bold">{props.label}</span>
  </div>
);
