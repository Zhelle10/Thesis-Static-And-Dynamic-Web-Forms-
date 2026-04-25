
import './App.css'
import { Routes, Route } from "react-router-dom";
import StaticForm from '../ai/StaticForm.jsx';
import DynamicForm from '../ai/DynamicForm.jsx';


function App() {

  return (
    <>
      
      <Routes>
        <Route path="/static" element={<StaticForm />} />
        <Route path="/dynamic" element={<DynamicForm />} />
    
      </Routes>
      
    </>
  )
}

export default App
