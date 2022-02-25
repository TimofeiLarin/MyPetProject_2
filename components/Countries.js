import { useState } from 'react';
import styled from 'styled-components';
import { useGetCountries } from '../lib/hooks';
import CountryData from './CountryData';

const Countries = () => {
  const [country, setCountry] = useState('');
  const [countrySelected, setCountrySelected] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);
  const { data: countries } = useGetCountries();
  const handleClick = (name) => {
    setCountry(name);
    setCountryOptions([]);
    setCountrySelected(name);
  };
  const handleInput = (e) => {
    if (e.target.value) {
      setCountry(e.target.value);
      const options = countries.filter((res) => {
        const regex = new RegExp(e.target.value, 'gi');
        return res.name.match(regex);
      });
      setCountryOptions(options);
    } else {
      setCountry('');
      setCountryOptions([]);
    }
  };
  const renderCountry = (flagUrl, name, id) => {
    return (
      <div className='option' key={id} onClick={() => handleClick(name)}>
        <img src={flagUrl} alt={name} />
        <span>{name}</span>
      </div> 
    );
  };

  return (
    <Container>
      <div className='form'>
        <h2>Countries</h2>
        <input type='text' value={country} onChange={handleInput} />
        {!!countryOptions.length && (
          <div>{countryOptions.map((res) => renderCountry(res.media.flag, res.name, res.id))}</div>
        )}
      </div>
      {countrySelected && <CountryData country={countrySelected} />}
    </Container>
  );
};

export default Countries;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 610px;
  min-width: 220px;
  margin: 50px auto 0;
  padding: 5px;
  background-color: #dcf2f0;
  border: 5px solid #a60003;
  border-radius: 5px;
  .form {
    min-width: 200px;
    max-width: 400px;
    min-height: 26px;
    max-height: 300px;
    border: 3px solid #a60003;
    border-radius: 5px;
    margin: 10px 0;
    padding: 5px;
    font-size: 16px;
    overflow: auto;
  }
  .option {
    border-bottom: 1px solid #a60003;
    padding: 5px;
    cursor: pointer;
    img {
      max-width: 30px;
      margin-right: 10px;
    }
  }
`;
