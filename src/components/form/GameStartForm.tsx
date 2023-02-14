import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import GameStartUtils from '../../utils/GameStartUtils';
import NumberField from './NumberField';

type Payload = {
  column: number;
  row: number;
  numberOfMoles: number;
};

interface Props {
  initialValue: {
    column: number;
    row: number;
    numberOfMoles: number;
  };
  onSubmit(payload: Payload): void;
}

function GameStartForm({ initialValue, onSubmit }: Props) {
  const [column, setColumn] = useState(initialValue.column);
  const [row, setRow] = useState(initialValue.row);
  const [numberOfMoles, setNumberOfMoles] = useState(
    initialValue.numberOfMoles
  );

  const isColumnValid = GameStartUtils.validateColSize(column);
  const isRowValid = GameStartUtils.validateRowSize(row);
  const isNumOfMolesValid = GameStartUtils.validateNumberOfMoles(
    numberOfMoles,
    column,
    row
  );

  const isSumbitAvaliable = isColumnValid && isRowValid && isNumOfMolesValid;

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!isSumbitAvaliable) {
      return;
    }

    onSubmit({
      column,
      row,
      numberOfMoles,
    });
  };

  return (
    <Form onSubmit={submit}>
      <NumberField
        id="column"
        label="열"
        errorMessage="열은 최소 2, 최대 6 까지 입력 할 수 있습니다."
        isValid={isColumnValid}
        value={column}
        onChange={setColumn}
        min={2}
        max={6}
      />
      <NumberField
        id="row"
        label="행"
        errorMessage="행은 최소 2, 최대 6 까지 입력 할 수 있습니다."
        isValid={isRowValid}
        value={row}
        onChange={setRow}
        min={2}
        max={6}
      />
      <NumberField
        id="numberOfMoles"
        label="두더지"
        errorMessage="두더지는 최소 1마리에서 전체 굴 개수에 절반 미만으로 입력 가능합니다"
        isValid={isNumOfMolesValid}
        value={numberOfMoles}
        onChange={setNumberOfMoles}
        min={1}
        max={GameStartUtils.calculateMaxNumberOfMoles(column, row)}
      />
      <SumbitButton type="submit" disabled={!isSumbitAvaliable}>
        시작
      </SumbitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SumbitButton = styled.button`
  width: 100px;
  :disabled {
    background-color: gray;
  }
`;

export default GameStartForm;
