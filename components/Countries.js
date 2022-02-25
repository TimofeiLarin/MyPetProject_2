import { useState } from 'react';
import styled from 'styled-components';
import { useGetCountries } from '../lib/hooks';

const Countries = () => {
  const [country, setCountry] = useState('');
  const data = useGetCountries();
  const handleInput = (e) => {
    if (e.target.value){
      setCountry(e.target.value);
    } else {
      setCountry('');
    }
  }
  console.log(country);

  return (
    <Container>
      <div className='form'>
        <h2>Countries</h2>
        <input type='text' value={country} onChange={handleInput}/>
      </div>
    </Container>
  );
};

export default Countries;

const Container = styled.div`
  display:flex;
  justify-content: center;
  max-width: 610px;
  margin: 50px auto 0;
  background-color: #5DFC68;
  border: 5px solid #A60003;
  border-radius: 5px;
  .form {
    width: 210px;
    min-height:26px;
    border: 3px solid #A60003;
    border-radius: 5px;
    margin: 10px 0;
    padding: 5px;
    font-size: 16px;
  }
`;
