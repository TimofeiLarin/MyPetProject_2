import { useState } from 'react';
import styled from 'styled-components';
import { useGetCountries } from '../lib/hooks';

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
    return flagUrl ? (
      <div className='option' key={id} onClick={() => handleClick(name)}>
        <img src={flagUrl} alt={name} />
        <span>{name}</span>
      </div>
    ) : null;
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
    </Container>
  );
};

export default Countries;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 610px;
  margin: 50px auto 0;
  background-color: #dcf2f0;
  border: 5px solid #a60003;
  border-radius: 5px;
  .form {
    width: 210px;
    min-height: 26px;
    border: 3px solid #a60003;
    border-radius: 5px;
    margin: 10px 0;
    padding: 5px;
    font-size: 16px;
    max-height: 300px;
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
