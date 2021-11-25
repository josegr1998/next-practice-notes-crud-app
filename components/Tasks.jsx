import React from "react";
import { useTaskContext } from "../context/taskContext";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";

const Tasks = () => {
  const { tasks } = useTaskContext();
  //crear el UI para mostrar tasks

  return (
    <Wrapper>
      <div className='container'>
        <div className='tasks-header'>
          <h2>Current Notes!</h2>
        </div>
        <div className='tasks-container'>
          {tasks.map((task) => {
            return (
              <div className='single-task' key={task._id}>
                <Link href={`/taskDetails/${task._id}`}>
                  <h3>{task.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    background-color: var(--primary-color);
    padding: 1rem;
    min-width: 50vw;
    min-height: 30vh;
  }
  h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: white;
  }
  .single-task {
    background: white;
    padding: 0.25rem;
    border-radius: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
    font-size: 1.2rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }
  h3 {
    cursor: pointer;
    transition: all 0.3s linear;
    text-align: center;
  }
  h3:hover {
    color: var(--primary-color);
  }
  .icons-container {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
  }
`;

export default Tasks;
