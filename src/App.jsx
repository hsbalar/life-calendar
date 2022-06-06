import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Color from './utils/color'
import getWeeksDifference from './utils/getWeeksDifference'

const Title = styled.div`
  font-weight: bold;
`;

const SubTitle = styled.span`
  font-weight: normal;
  font-size: 13px;
`;

const Life = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const Week = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${(props) => props.color || '#ebedf0'};
`;

const DateContainer = styled.div`
  border-radius: 4px;
  background: linear-gradient(45deg, pink 30%, #ff79ff 70%);
  padding: 8px;
  right: 2%;
  top: 2%;
  font-family: sans-serif;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  gap: 20px;
  box-shadow: 1px 1px 4px 1px #00000036;
`;

const DateInput = styled.input`
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 3px 7px;
`;

const DateLabel = styled.span`
  font-size: 12px;
`;

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
      <DateContainer>
          <Title>
            Life Calendar — <SubTitle>Your life in weeks</SubTitle>
          </Title>
          <div>
            <DateLabel>
              <label htmlFor="date">Your Birthdate </label>
            </DateLabel>           
            <DateInput
              type="date"
              name="date"
              placeholder="dd/mm/yyyy"
              value={userDate}
              onChange={(e) => onInputChange(e.target.value)}
              maxLength="10"
            />
          </div>
      </DateContainer>
      <Life>
        {Array.from(Array(4160).keys()).map((week) => (
          <Week
            key={`week_${week}`}
            title={'Week #' + week}
            delay={week}
            color={colorShades[week] || null}
          ></Week>
        ))}
      </Life>
    </>
  )
}

export default App
