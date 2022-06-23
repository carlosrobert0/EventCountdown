import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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
  EventList,
  LoadContainer
} from './styles'

export interface DataListProps extends EventCardProps {
  id: string;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])

  const theme = useTheme()

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

    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadEvents()
  }, [data]))

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer> :
          <>
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
                renderItem={({ item }) => <EventCard data={item} />}
              />
            </Events>
          </>
      }
    </Container>
  )
}