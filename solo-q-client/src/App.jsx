import { BrowserRouter, Routes, Route } from "react-router";
import QuestionNotePage from "./pages/note/QuestionNotePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/note" element={<QuestionNotePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
