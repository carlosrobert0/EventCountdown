import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  padding: 17px 24px;
  margin-bottom: 16px;
`

export const TitleInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`

export const Icon = styled(FontAwesome5)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.attention};
`

export const Countdown = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) =>  theme.colors.success};

  margin-top: 2px;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`