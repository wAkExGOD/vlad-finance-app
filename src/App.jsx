import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Nav, Notification } from './components/';
import { Categories, Purchases, Overview, NoPage, Settings, LogIn, Registration, NewPassword } from './pages';
import { fetchAuthMe, selectIsAuth } from "./store/reducers/AuthSlice";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    // if (isAuth) {
      dispatch(fetchAuthMe());
    // }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <main className="main">
          <Routes>
            <Route index element={<Purchases />} />
            <Route path="categories" element={<Categories />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<LogIn />} />
            <Route path="registration" element={<Registration />} />

            <Route path="new-password/:key" element={<NewPassword />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
      </div>
      {/* <div className="notifications"> */}
        {/* <Notification text="Error" status="warning" time={2} /> */}
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
