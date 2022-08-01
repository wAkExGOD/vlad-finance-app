import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Nav, Notification } from './components/';
import { Categories, Purchases, Overview, NoPage, Settings, LogIn, Registration } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <main className="main">
          <Routes>
            <Route index element={<Categories />} />
            <Route path="categories" element={<Categories />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<LogIn />} />
            <Route path="registration" element={<Registration />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
      </div>
      <div className="notifications">
        {/* <Notification text="Error" status="warning" time={2} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
