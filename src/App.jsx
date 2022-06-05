import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Color from './utils/color'
import getWeeksDifference from './utils/getWeeksDifference'

const Life = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Week = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${(props) => props.color || '#ebedf0'};
`

const DateInput = styled.div`
  border-radius: 4px;
  background-color: #cee2ff;
  padding: 8px;
  position: absolute;
  right: 2%;
  top: 2%;
`

function App() {
  const [userDate, setUserDate] = useState('')
  const [colorShades, setColorShades] = useState([])
  const colors = new Color({
    red: 0,
    green: 93,
    blue: 43,
  })
  const onInputChange = (value) => {
    let newValue = value
    if (
      value.match(/^\d{2}$/) !== null ||
      value.match(/^\d{2}\/\d{2}$/) !== null
    ) {
      newValue = value + '/'
    }
    setUserDate(newValue)
  }

  useEffect(() => {
    const date = new Date(userDate)
    if (userDate && !isNaN(date.getTime())) {
      const lifeUtilised = getWeeksDifference(date, new Date())
      setColorShades(
        colors.getShades(lifeUtilised > 4160 ? 4160 : lifeUtilised).reverse()
      )
    }
  }, [userDate])

  return (
    <>
      <DateInput>
        <label htmlFor="date">Your Birthdate: </label>
        <input
          type="date"
          name="date"
          placeholder="dd/mm/yyyy"
          value={userDate}
          onChange={(e) => onInputChange(e.target.value)}
          maxLength="10"
        />
      </DateInput>
      <Life>
        {Array.from(Array(4160).keys()).map((week) => (
          <Week
            key={`week_${week}`}
            title={week}
            delay={week}
            color={colorShades[week] || null}
          ></Week>
        ))}
      </Life>
    </>
  )
}

export default App
