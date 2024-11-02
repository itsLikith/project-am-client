import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/NavBar.css";
import { UsersRound, TicketCheck, NotebookPen, LibraryBig } from 'lucide-react';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <StyledWrapper>
      <div className="button-container">
        <Link to='/emp' className='button' title='Employees'>
          <UsersRound />
        </Link>
        <Link to='/val' className="button" title='Validity'>
          <TicketCheck />
        </Link>
        <Link to='/iss' className="button" title='Issue'>
            <NotebookPen />
        </Link>
        <Link to='/rec' className="button" title='Records'>
            <LibraryBig />
        </Link>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    background-color: rgb(27, 133, 219);
    width: 300px;
    height: 45px;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
      rgba(27, 133, 219, 0.5) 5px 10px 15px;
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 20px;
  }
`;

export default NavBar;