import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './route';
import { Provider } from 'react-redux';
import store from './store';
import './App.less';
import { SWRConfig } from 'swr';
import { Suspense } from 'react';
import { Spin } from 'antd';

function App() {
  console.log('aa');

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
          dedupingInterval: 5000,
        }}
      >
        <Suspense fallback={<Spin className="fallbackSpin" />}>
          <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
        </Suspense>
      </SWRConfig>
    </Provider>
  );
}

export default App;
