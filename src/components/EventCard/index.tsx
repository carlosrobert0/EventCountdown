import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { Alert, TouchableOpacity } from 'react-native';
import { 
  Container,
  TitleInfo,
  Title,
  Icon,
  Countdown,
  Footer,
  Description 
} from './styles'

export interface EventCardProps {
  id: string;
  title: string;
  date: number;
  description: string;
}

interface Props {
  data: EventCardProps
}

export function EventCard({ data }: Props) {
  const dataKey = '@eventCountdown:events'

  async function removeItemValue(id: string) {
    try {
      const list = await AsyncStorage.getItem(dataKey);
      const listParsed = JSON.parse(list!)
      var newList = listParsed.filter((item: any) => item.id != id);
      await AsyncStorage.setItem(dataKey, JSON.stringify(newList));
    }
    catch(e) {
      Alert.alert("Não foi possível remover")
    }
  }

  return (
    <Container>
      <TitleInfo>
        <Title>
          {data.title}
        </Title>
        <TouchableOpacity onPress={() => removeItemValue(data.id)}>
          <Icon name="trash-alt" />
        </TouchableOpacity>
      </TitleInfo>

      <Countdown>
        {data.date < 2 ? `Resta ${data.date}dia` : `Restam ${data.date}dias`}
      </Countdown>

      <Footer>
        <Description>
          {data.description}
        </Description>
      </Footer>
    </Container>
  )
}