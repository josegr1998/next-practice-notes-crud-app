import React from "react";
import styled from "styled-components";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <Wrapper>
      <h1>Created By </h1>
      <a href='https://github.com/josegr1998' target='_blank' rel='noreferrer'>
        <span>
          <AiOutlineGithub className='icon' />
        </span>
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 4rem;
  background: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  h1 {
    font-size: 2rem;
    color: white;
  }
  .icon {
    font-size: 2rem;
    transition: all 0.3s linear;
    color: white;
  }
  .icon:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default Footer;
