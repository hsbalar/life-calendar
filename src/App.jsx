import { useState } from 'react'
import times from 'lodash.times'
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
  background-color: ${(props) => props.color || '#ebedf0'};
`

function App() {
  const [userDate, setUserDate] = useState('')
  const lifeUtilised = getWeeksDifference(new Date('1992-03-14'), new Date())
  const colors = new Color({
    red: 0,
    green: 93,
    blue: 43,
  })
  const colorShades = colors.getShades(lifeUtilised).reverse()

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

  return (
    <>
      {/* <input
        type="text"
        name="date"
        placeholder="dd/mm/yyyy"
        value={userDate}
        onChange={(e) => onInputChange(e.target.value)}
        maxLength="10"
      /> */}
      <Life>
        {times(4160, (week) => (
          <Week
            key={`${week}`}
            title={week}
            delay={week}
            color={colorShades[week]}
          ></Week>
        ))}
      </Life>
    </>
  )
}

export default App
