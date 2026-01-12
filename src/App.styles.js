import styled, { keyframes, css } from 'styled-components'

// Keyframe animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

export const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`

// Layout components
export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 20px;
  box-sizing: border-box;
`

export const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`

export const TitleSection = styled.div``

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #ff6b9d, #c44cff, #6b9dff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
`

export const SubTitle = styled.p`
  margin: 4px 0 0 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #ff6b9d;
    }
  }
`

// Date input section
export const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: end;

  @media (max-width: 900px) {
    justify-self: center;
  }
`

export const DateLabel = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
`

export const DateInput = styled.input`
  font-size: 14px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 12px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
    background: rgba(255, 255, 255, 0.15);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`

// Stats section
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  animation: ${fadeIn} 0.5s ease-out 0.1s backwards;
`

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 20px 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Glassy shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  /* Glow effect on hover */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    transition: all 0.5s ease;
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 255, 255, 0.1),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);

    &::before {
      left: 100%;
    }

    &::after {
      width: 300px;
      height: 300px;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.color || '#fff'};
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, text-shadow 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
    text-shadow: 0 0 20px
      ${(props) => props.color || 'rgba(255, 255, 255, 0.5)'};
  }
`

export const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;

  ${StatCard}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`

// Progress bar
export const ProgressBarContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out 0.2s backwards;
`

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`

export const ProgressBar = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.percent}%;
  background: linear-gradient(90deg, #00c853, #69f0ae);
  border-radius: 4px;
  transition: width 1s ease-out;
`

// Calendar section
export const CalendarSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out 0.3s backwards;
`

// Quote components
export const HeaderQuote = styled.div`
  text-align: center;
  padding: 0 20px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const QuoteCard = styled.div`
  animation: ${fadeInOut} 10s ease-in-out;
`

export const QuoteText = styled.p`
  margin: 0 0 6px 0;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
`

export const QuoteAuthor = styled.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);

  &::before {
    content: '— ';
  }
`

// Legend
export const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
`

export const LegendColor = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: ${(props) => props.color};
`

// Life calendar grid
export const Life = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  justify-content: center;
`

export const Week = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${(props) => props.color || 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.2s;
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.isCurrentWeek &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
      box-shadow: 0 0 8px ${props.color || '#69f0ae'};
    `}

  &:hover {
    transform: scale(1.5);
    z-index: 10;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`

// Tooltip
export const Tooltip = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  transform: translate(-50%, -100%);
  margin-top: -8px;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
`

// Modal components
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`

export const Modal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

export const ModalEmoji = styled.span`
  font-size: 64px;
  display: block;
  margin-bottom: 20px;
`

export const ModalTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 28px;
  background: linear-gradient(90deg, #ff6b9d, #c44cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export const ModalSubtitle = styled.p`
  margin: 0 0 32px 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
  line-height: 1.5;
`

export const ModalInput = styled.input`
  font-size: 18px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 14px 18px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #ff6b9d;
    background: rgba(255, 255, 255, 0.15);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`

export const ModalButton = styled.button`
  background: linear-gradient(90deg, #ff6b9d, #c44cff);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(196, 76, 255, 0.4);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const ModalHint = styled.p`
  margin: 16px 0 0 0;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`