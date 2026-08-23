interface Props {
  value?: string | number | Date;
  label: string;
}

export function Entry(props: Props) {
  if (props.value === undefined) return;
  return (
    <li>
      {props.label}: {props.value.toString()}
    </li>
  );
}
