import times from 'lodash.times'
import styled from 'styled-components'

const Life = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Week = styled.span`
  width: 16px;
  height: 16px;
  background-color: #ebedf0;
`;

function App() {
  return (
    <Life>
      {times(52, (col) => 
        times(90, (row) => <Week key={`${col}${row}`}></Week>)
      )}
    </Life>
  );
}

export default App;
