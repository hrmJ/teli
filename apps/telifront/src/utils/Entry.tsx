interface Props {
  value?: string | number;
  label: string;
}

export function Entry(props: Props) {
  if (props.value === undefined) return;
  return (
    <li>
      {props.label}: {props.value}
    </li>
  );
}
