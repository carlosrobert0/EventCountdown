import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useFocusEffect } from '@react-navigation/native';

import { EventCard, EventCardProps } from '../../components/EventCard'

import {
  Container,
  Header,
  EventWrapper,
  Event,
  EventInfo,
  EventTitle,
  CountdownTitle,
  Events,
  Title,
  EventList
} from './styles'

export interface DataListProps extends EventCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadEvents() {
    const dataKey = '@eventCountdown:events'

    const response = await AsyncStorage.getItem(dataKey)
    const events = response ? JSON.parse(response) : []

    const eventsFormatted: DataListProps[] = events
    .map((item: DataListProps) => {
      const date1 = moment()
      const date2 = moment(item.date, "DD/MM/YYYY")
      const days = date2.diff(date1, 'days')

      return {
        id: item.id,
        title: item.title,
        date: days + 1,
        description: item.description,
      }
    })

    setData(eventsFormatted)
  }

  useEffect(() => {
    loadEvents()
  }, [data])

  useFocusEffect(useCallback(() => {
    loadEvents()
  }, []))

  return (
    <Container>
      <Header>
        <EventWrapper>
          <Event>
            <EventInfo>
              <EventTitle>Event</EventTitle>
              <CountdownTitle>Countdown</CountdownTitle>
            </EventInfo>
          </Event>
        </EventWrapper>
      </Header>

      <Events>
        <Title>Listagem</Title>

        <EventList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <EventCard data={item}/>}
        />
      </Events>
    </Container>
  )
}