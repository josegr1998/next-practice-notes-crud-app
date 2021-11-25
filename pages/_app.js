import "../styles/globals.css";
import { TaskProvider } from "../context/taskContext";
import Layout from "../Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <TaskProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TaskProvider>
  );
}

export default MyApp;
