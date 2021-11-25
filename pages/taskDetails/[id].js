import axios from "axios";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { useTaskContext } from "../../context/taskContext";
import Router from "next/router";
//{moment(createdAt).fromNow()}
//links do not accept functions apparently

const taskDetails = ({ task }) => {
  console.log(task);
  const { setEditTask } = useTaskContext();

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);

      console.log(response);

      Router.push("/");
    } catch (error) {}
  };

  return (
    <Wrapper>
      <div className='task-container'>
        <div className='task-info'>
          <h2>{task.title}</h2>
          <p>{task.details}</p>
          <p>Created {moment(task.createdAt).fromNow()}</p>
        </div>
        <div className='icons-container'>
          <Link href={"/newTask"}>
            <AiFillEdit
              className='icon edit'
              onClick={() => setEditTask(task)}
            />
          </Link>

          <AiFillDelete
            className='icon delete'
            onClick={() => deleteTask(task._id)}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 8rem);
  .task-container {
    background-color: #e0c9a6;
    padding: 1rem;
    width: 70vw;
    max-width: 700px;
    margin: 2rem auto;
  }
  h2 {
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0;
    color: var(--primary-500);
  }
  p {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .icons-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  .icon {
    cursor: pointer;
    transition: all 0.3s linear;
    font-size: 1.5rem;
  }
  .edit:hover {
    color: green;
  }
  .delete:hover {
    color: red;
  }
`;

export const getServerSideProps = async (context) => {
  const id = context.params.id;

  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  const response = await axios.get(
    `${dev ? DEV_URL : PROD_URL}/api/tasks/${id}`
  );

  const data = response.data;

  return {
    props: {
      task: data.data,
    },
  };
};

export default taskDetails;
