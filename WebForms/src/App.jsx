
import './App.css'
import { Routes, Route } from "react-router-dom";
import StaticForm from '../ai/StaticForm.jsx';
import DynamicForm from '../ai/DynamicForm.jsx';
import ThanksMessage from '../ai/ThanksMessage.jsx';
import WelcomeMessage from '../ai/WelcomeMessage.jsx';


function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<WelcomeMessage />} />
        <Route path="/static" element={<StaticForm />} />
        <Route path="/dynamic" element={<DynamicForm />} />
        <Route path="/thankYou" element={<ThanksMessage />} /> 
      </Routes>
      
    </>
  )
}

export default App
