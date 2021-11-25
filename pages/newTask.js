import React, { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import axios from "axios";
import { useTaskContext } from "../context/taskContext";
//new task also used to edit the tasks
//SOLO FALTA LA FUNCIONALIDAD DE DELETE
const newTask = () => {
  const { editTask, changeEditTask, deleteEditTask } = useTaskContext();

  const [formState, setFormState] = useState({ title: "", details: "" });
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState({ titleMessage: "", detailsMessage: "" });

  const handleChange = (name, value) => {
    if (editTask) {
      changeEditTask(name, value);
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editTask) {
      if (formState.title.length < 1) {
        setError({
          ...error,
          titleMessage: "Please Write a Title",
          detailsMessage: "",
        });
        return;
      }
      if (formState.details.length < 1) {
        setError({
          ...error,
          titleMessage: "",
          detailsMessage: "Please Write a Note",
        });
        return;
      }
    }

    try {
      setIsPosting(true);
      if (editTask) {
        const response = await axios.patch(`/api/tasks/${editTask._id}`, {
          title: editTask.title,
          details: editTask.details,
        });

        console.log(response);

        deleteEditTask();
      } else {
        const response = await axios.post("/api/tasks", formState);
        console.log(response);
      }

      setIsPosting(false);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        {error.titleMessage && <h2 className='error'>{error.titleMessage}</h2>}
        <input
          type='text'
          className='input'
          name='title'
          placeholder='Title'
          value={editTask ? editTask.title : formState.title}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
        />
        {error.detailsMessage && (
          <h2 className='error' style={{ marginBottom: "2rem" }}>
            {error.detailsMessage}
          </h2>
        )}
        <textarea
          name='details'
          className='text'
          placeholder='your note'
          cols='30'
          rows='10'
          value={editTask ? editTask.details : formState.details}
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
        ></textarea>
        <button type='submit' className='btn'>
          {editTask ? "Edit" : isPosting ? "Posting..." : "Post"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 8rem);
  background: #e3eefd;

  .input,
  .text {
    border: 1px solid black;
    background: #e0c9a6;
  }
  .input {
    font-size: 1.2rem;
    min-width: 70vw;
    margin: 2rem auto;
    display: block;
    padding: 0.5rem;
  }
  .text {
    min-width: 70vw;
    margin: 0 auto;
    display: block;
    padding: 0.5rem;
  }
  .btn {
    width: 7rem;
    display: block;
    font-size: 1.7rem;
    padding: 0.25rem;
    margin: 0 auto;
    margin-top: 2rem;
    transition: all 0.3s linear;
  }
  .btn:hover {
    color: var(--primary-color);
  }
  .error {
    text-align: center;
    color: red;
    font-size: 1.2rem;
    margin-top: 2rem;
  }
`;

export default newTask;
