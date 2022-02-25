import styled from 'styled-components';
import { useGetStats } from '../lib/hooks';

const CountryData = ({ country }) => {
  const { data, error, loading } = useGetStats(country);
  return (
    <Container>
      {error && <p className='message error'>Error...</p>}
      {loading && <p className='message'>Loading...</p>}
      {data && !!Object.keys(data).length && !error && !loading &&(
        <>
          <h2>Statistic</h2>
          <div className='stats'>
            <p>
              <span>Total cases of covid 19: </span> {data.confirmed.value}
            </p>
            <p>
              <span>Total deaths of covid 19: </span> {data.deaths.value}
            </p>
          </div>
        </>
      )}
      
    </Container>
  );
};

export default CountryData;

const Container = styled.div`
  min-width: 200px;
  max-width: 400px;
  margin: 10px 0;
  padding: 5px;
  position: relative;
  min-height: 26px;
  border: 3px solid #a60003;
  border-radius: 5px;
  .message {
    color:green;
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 0;
    font-size: 30px;
  }
  .error {
    color: red;
  }
  .stats {
    display: flex;
    p {
      display: flex;
      flex-direction: column;
      margin: 0 10px 0 0;
    }
  }
`;
