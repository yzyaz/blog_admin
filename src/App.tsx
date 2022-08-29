import { useRoutes } from 'react-router-dom';
import routes from './route';
import { Provider } from 'react-redux';
import store from './store';
import { SWRConfig } from 'swr';
import { Suspense } from 'react';
import { Spin } from 'antd';

import './App.less';

function App() {
  const element = useRoutes(routes);

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
          {element}
        </Suspense>
      </SWRConfig>
    </Provider>
  );
}

export default App;
