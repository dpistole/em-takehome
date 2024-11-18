interface SectionHeaderProps {
  label: string;
}

export const SectionHeader = (props: SectionHeaderProps) => (
  <div data-test-id="section-header">
    <span className="font-bold text-2xl">{props.label}</span>
  </div>
);
