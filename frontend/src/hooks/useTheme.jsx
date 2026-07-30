import { useContext } from 'react'
import ThemeContext, { useThemeContext } from '../context/ThemeContext'

export default function useTheme() {
  return useThemeContext()
}
