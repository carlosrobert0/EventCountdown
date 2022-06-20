import React from 'react'
import {
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Form/Button'
import { InputForm } from '../../components/Form/InputForm'
import { InputDateForm } from '../../components/Form/InputDateForm'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
} from './styles'

type FormData = {
  [name: string]: any;
}

type NavigationProps = {
  navigate: (screen: string) => void;
}

const schema = Yup.object().shape({
  title: Yup
    .string()
    .required('Título do evento é obrigatório'),
  date: Yup
    .string()
    .required('A data é obrigatória'),
  description: Yup
    .string()
    .required('A descrição é obrigatória'),
})

export function Register() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation<NavigationProps>()

  async function handleSubmitRegister(form: FormData) {
    const newEvent = {
      id: String(uuid.v4()),
      title: form.title,
      date: form.date,
      description: form.description
    }

    try {
      const dataKey = '@eventCountdown:events'

      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newEvent
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset()

      navigation.navigate('Listagem')
    } catch (error) {
      Alert.alert("Não foi possível salvar")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="title"
              placeholder="Título do evento"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.title && errors.title.message}
            />
            <InputDateForm
              name="date"
              control={control}
              keyboardType="numeric"
              error={errors.date && errors.date.message}
              placeholder="Data do evento"
            />
            <InputForm
              name="description"
              control={control}
              error={errors.description && errors.description.message}
              placeholder="Descrição do evento"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleSubmitRegister)}
          />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  )
}