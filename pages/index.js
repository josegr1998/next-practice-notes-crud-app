import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useTaskContext } from "../context/taskContext";
import axios from "axios";
import styled from "styled-components";
import Tasks from "../components/Tasks";
import Link from "next/link";

export default function Home({ posts }) {
  const { setData } = useTaskContext();
  console.log(posts);

  useEffect(() => {
    setData(posts);
  }, []);

  if (posts.length < 1) {
    return (
      <div style={{ height: "calc(100vh - 8rem)" }}>
        <h2>No notes yet!</h2>
        <Link href='/newTask'>Create new one</Link>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className='app-container'>
        <Tasks />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: calc(100vh - 8rem);
  display: grid;
  place-items: center;
`;

export const getServerSideProps = async () => {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  const response = await axios.get(`${dev ? DEV_URL : PROD_URL}/api/tasks`);

  const data = response.data;
  console.log(data);
  return {
    props: {
      posts: data.data,
    },
  };
};
