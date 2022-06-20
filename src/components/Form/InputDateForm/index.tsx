import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import { InputDate } from '../InputDate'

import {
  Container,
  Error,
} from './styles'

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputDateForm({
  control,
  name,
  error,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputDate
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={value}
            onChangeText={onChange}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}