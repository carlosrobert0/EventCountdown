import styled from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(TextInputMask)`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({ theme }) => theme.fonts.regular};;
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  
  margin-bottom: 8px;
`