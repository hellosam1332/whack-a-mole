import styled from '@emotion/styled';

interface Props {
  label: string;
  id: string;
  value: number;
  onChange(v: number): void;
  isValid: boolean;
  errorMessage: string;
  min: number;
  max: number;
}

export default function NumberField({
  label,
  id,
  value,
  onChange,
  isValid,
  errorMessage,
  min,
  max,
}: Props) {
  return (
    <Label htmlFor={id}>
      {label}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        type="number"
        id={id}
        name={id}
        aria-invalid={!isValid}
        aria-errormessage={`${id}-error`}
        min={min}
        max={max}
      />
      {isValid ? null : (
        <ErrorMessage id={`${id}-error`}> {errorMessage} </ErrorMessage>
      )}
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #ccc;
`;

const ErrorMessage = styled.span`
  color: orangered;
  font-size: 1rem;
`;
