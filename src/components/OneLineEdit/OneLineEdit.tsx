import { useEffect, useState } from 'react';

export interface Props {
  onCancel: () => void,
  onConfirm: (value: string) => void,
  initialValue: string,
}

export const OneLineEdit = ({
  initialValue,
  onCancel,
  onConfirm,
}: Props) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      onConfirm(value);
    } else if (evt.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <input
      value={value}
      autoFocus={true}
      onChange={(evt) => setValue(evt.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => onCancel()}
    />
  )
};
