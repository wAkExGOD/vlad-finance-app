import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Nav, Notification } from './components/';
import { Categories, Purchases, Overview, NoPage, Settings } from './pages';


function App() {
  // const colors = ['#a2a8d3', '#38598b', '#79c2d0', '#f5c7f7', '#00bbf0', '#bae8e8', '#cca8e9'];

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <main id="main">
          <Routes>
            <Route index element={<Categories />} />
            <Route path="categories" element={<Categories />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<Settings />} />
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
