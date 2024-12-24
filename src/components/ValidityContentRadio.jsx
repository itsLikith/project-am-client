import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Car, UserRound } from 'lucide-react';

const ValidityContentRadio = () => {
  return (
    <StyledWrapper>
      <div className="input d-flex">
        <Link to="/admin/validity/aep&adp" className="text-decoration-none">
          <button className="value">
            <UserRound />
            AEP/ADP
          </button>
        </Link>
        <Link to="/admin/validity/avp" className="text-decoration-none">
          <button className="value">
            <Car />
            AVP
          </button>
        </Link>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    display: flex;
    flex-direction: row;
    width: fit-content;
    background-color: #0d1117;
    justify-content: center;
    border-radius: 5px;
    gap: 7.5px;
  }

  .value {
    background-color: transparent;
    border: none;
    padding: 10px;
    color: white;
    display: flex;
    position: relative;
    gap: 5px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .value:not(:active):hover,
  .value:focus {
    background-color: #21262c;
  }

  .value:focus,
  .value:active {
    background-color: #1a1f24;
    outline: none;
  }

  .value::before {
    content: '';
    position: absolute;
    top: 30px;
    right: 0px;
    width: 100%;
    height: 3px;
    background-color: #2f81f7;
    border-radius: 5px;
    opacity: 0;
  }

  .value:focus::before,
  .value:active::before {
    opacity: 1;
  }

  .value svg {
    width: 15px;
  }
`;

export default ValidityContentRadio;
