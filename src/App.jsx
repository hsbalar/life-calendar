import { useEffect, useState, useMemo } from 'react'

import Color from './utils/color'
import getWeeksDifference from './utils/getWeeksDifference'
import {
  Container,
  Header,
  TitleSection,
  Title,
  SubTitle,
  DateSection,
  DateLabel,
  DateInput,
  StatsContainer,
  StatCard,
  StatValue,
  StatLabel,
  ProgressBarContainer,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  CalendarSection,
  HeaderQuote,
  QuoteCard,
  QuoteText,
  QuoteAuthor,
  Legend,
  LegendItem,
  LegendColor,
  Life,
  Week,
  Tooltip,
  Overlay,
  Modal,
  ModalEmoji,
  ModalTitle,
  ModalSubtitle,
  ModalInput,
  ModalButton,
  ModalHint,
} from './App.styles'

const STORAGE_KEY = 'life-calendar-dob'
const TOTAL_WEEKS = 4160 // 80 years × 52 weeks

const QUOTES = [
  {
    text: 'The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.',
    author: 'Ralph Waldo Emerson',
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon',
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: 'Abraham Lincoln',
  },
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    text: 'Life is really simple, but we insist on making it complicated.',
    author: 'Confucius',
  },
  { text: 'The unexamined life is not worth living.', author: 'Socrates' },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: 'Steve Jobs',
  },
  {
    text: 'Life is either a daring adventure or nothing at all.',
    author: 'Helen Keller',
  },
  {
    text: 'The biggest adventure you can take is to live the life of your dreams.',
    author: 'Oprah Winfrey',
  },
  {
    text: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',
    author: 'Buddha',
  },
  {
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: 'George Bernard Shaw',
  },
  {
    text: 'The good life is one inspired by love and guided by knowledge.',
    author: 'Bertrand Russell',
  },
  {
    text: 'To live is the rarest thing in the world. Most people exist, that is all.',
    author: 'Oscar Wilde',
  },
  {
    text: 'Life is 10% what happens to us and 90% how we react to it.',
    author: 'Charles R. Swindoll',
  },
  { text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },
  {
    text: 'You only live once, but if you do it right, once is enough.',
    author: 'Mae West',
  },
  {
    text: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
  },
  {
    text: "Twenty years from now you will be more disappointed by the things you didn't do than by the ones you did.",
    author: 'Mark Twain',
  },
]

function App() {
  const savedDob = localStorage.getItem(STORAGE_KEY) || ''
  const [userDate, setUserDate] = useState(savedDob)
  const [showWelcome, setShowWelcome] = useState(!savedDob)
  const [tempDate, setTempDate] = useState('')
  const [colorShades, setColorShades] = useState([])
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: '',
  })
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [quoteKey, setQuoteKey] = useState(0)

  const colors = new Color({
    red: 0,
    green: 93,
    blue: 43,
  })

  const stats = useMemo(() => {
    if (!userDate) return null
    const birthDate = new Date(userDate)
    if (isNaN(birthDate.getTime())) return null

    const weeksLived = getWeeksDifference(birthDate, new Date())
    const weeksRemaining = Math.max(0, TOTAL_WEEKS - weeksLived)
    const percentLived = Math.min(100, (weeksLived / TOTAL_WEEKS) * 100)
    const yearsLived = Math.floor(weeksLived / 52)

    return {
      weeksLived,
      weeksRemaining,
      percentLived: percentLived.toFixed(1),
      yearsLived,
      currentWeek: weeksLived - 1,
    }
  }, [userDate])

  const saveDob = (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    setUserDate(value)
  }

  const handleWelcomeSubmit = () => {
    if (tempDate) {
      saveDob(tempDate)
      setShowWelcome(false)
    }
  }

  const onInputChange = (value) => {
    saveDob(value)
  }

  const getWeekInfo = (weekIndex) => {
    const year = Math.floor(weekIndex / 52)
    const weekOfYear = (weekIndex % 52) + 1
    const isLived = stats && weekIndex < stats.weeksLived
    const isCurrent = stats && weekIndex === stats.currentWeek

    return {
      year,
      weekOfYear,
      isLived,
      isCurrent,
      label: `Year ${year + 1}, Week ${weekOfYear}${
        isCurrent ? ' (Current)' : isLived ? ' (Lived)' : ' (Future)'
      }`,
    }
  }

  const handleWeekHover = (e, weekIndex) => {
    const info = getWeekInfo(weekIndex)
    setTooltip({
      show: true,
      x: e.clientX,
      y: e.clientY,
      content: info.label,
    })
  }

  const handleWeekLeave = () => {
    setTooltip({ ...tooltip, show: false })
  }

  useEffect(() => {
    const date = new Date(userDate)
    if (userDate && !isNaN(date.getTime())) {
      const lifeUtilised = getWeeksDifference(date, new Date())
      setColorShades(
        colors
          .getShades(lifeUtilised > TOTAL_WEEKS ? TOTAL_WEEKS : lifeUtilised)
          .reverse()
      )
    }
  }, [userDate])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
      setQuoteKey((prev) => prev + 1)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      {showWelcome && (
        <Overlay>
          <Modal>
            <ModalEmoji>🗓️</ModalEmoji>
            <ModalTitle>Welcome to Life Calendar</ModalTitle>
            <ModalSubtitle>
              Visualize your life in weeks. Each box represents one week of an
              80-year life. Enter your birthdate to see your journey.
            </ModalSubtitle>
            <ModalInput
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
            <ModalButton onClick={handleWelcomeSubmit} disabled={!tempDate}>
              Begin My Journey ✨
            </ModalButton>
            <ModalHint>Your data stays in your browser</ModalHint>
          </Modal>
        </Overlay>
      )}

      <Header>
        <TitleSection>
          <Title>Life Calendar</Title>
          <SubTitle>
            Your life in weeks •{' '}
            <a
              href="https://github.com/hsbalar/life-calendar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </SubTitle>
        </TitleSection>
        <HeaderQuote>
          <QuoteCard key={quoteKey}>
            <QuoteText>"{QUOTES[quoteIndex].text}"</QuoteText>
            <QuoteAuthor>{QUOTES[quoteIndex].author}</QuoteAuthor>
          </QuoteCard>
        </HeaderQuote>
        <DateSection>
          <DateLabel htmlFor="birthdate">Birthdate:</DateLabel>
          <DateInput
            type="date"
            id="birthdate"
            value={userDate}
            onChange={(e) => onInputChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </DateSection>
      </Header>

      {stats && (
        <>
          <StatsContainer>
            <StatCard>
              <StatValue color="#69f0ae">
                {stats.weeksLived.toLocaleString()}
              </StatValue>
              <StatLabel>Weeks Lived</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue color="#ffd54f">
                {stats.weeksRemaining.toLocaleString()}
              </StatValue>
              <StatLabel>Weeks Remaining</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue color="#ff6b9d">{stats.yearsLived}</StatValue>
              <StatLabel>Years Old</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue color="#64b5f6">{stats.percentLived}%</StatValue>
              <StatLabel>Life Progress</StatLabel>
            </StatCard>
          </StatsContainer>

          <ProgressBarContainer>
            <ProgressLabel>
              <span>Life Progress</span>
              <span>{stats.percentLived}% of 80 years</span>
            </ProgressLabel>
            <ProgressBar>
              <ProgressFill percent={stats.percentLived} />
            </ProgressBar>
          </ProgressBarContainer>
        </>
      )}

      <CalendarSection>
        <Legend>
          <LegendItem>
            <LegendColor color="#2e7d32" />
            <span>Lived (recent)</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#1b5e20" />
            <span>Lived (earlier)</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="rgba(255, 255, 255, 0.1)" />
            <span>Future</span>
          </LegendItem>
        </Legend>

        <Life>
          {Array.from(Array(TOTAL_WEEKS).keys()).map((week) => {
            const info = getWeekInfo(week)
            return (
              <Week
                key={`week_${week}`}
                color={colorShades[week] || null}
                isCurrentWeek={info.isCurrent}
                onMouseEnter={(e) => handleWeekHover(e, week)}
                onMouseMove={(e) => handleWeekHover(e, week)}
                onMouseLeave={handleWeekLeave}
              />
            )
          })}
        </Life>
      </CalendarSection>

      {tooltip.show && (
        <Tooltip style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.content}
        </Tooltip>
      )}
    </Container>
  )
}

export default App