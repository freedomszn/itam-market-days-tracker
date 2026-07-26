import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CountdownPage from "./pages/CountdownPage";
import UpcomingPage from "./pages/UpcomingPage";
import CalendarPage from "./pages/CalendarPage";
import BotPage from "./pages/BotPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CountdownPage />} />
          <Route path="upcoming" element={<UpcomingPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="bot" element={<BotPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
