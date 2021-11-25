import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useTaskContext } from "../context/taskContext";

const Navbar = () => {
  const { deleteEditTask } = useTaskContext();

  return (
    <Wrapper>
      <div className='nav-container'>
        <h2>Tasks App</h2>
        <div className='links-container'>
          <Link href='/'>
            <span onClick={deleteEditTask}>Home</span>
          </Link>
          <Link href='/newTask'>
            <span onClick={deleteEditTask}>Create New Note</span>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 4rem;
  background: var(--primary-color);
  color: white;

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 0 auto;
    height: 100%;
  }
  h2 {
    font-size: 2rem;
  }
  .links-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 1.2rem;
    cursor: pointer;
    span {
      transition: all 0.3s linear;
    }
    span:hover {
      color: var(--primary-color-700);
    }
  }
`;

export default Navbar;
