import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';

const App = ({
  Component,
  pageProps,
}: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
