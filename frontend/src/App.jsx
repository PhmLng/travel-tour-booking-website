
import { ContactPage } from "./pages/ContactPage"
import Dashboard from "./pages/DashBoard"
import { HomePage } from "./pages/HomePage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"
import {BrowserRouter,Routes, Route } from 'react-router'

function App() {
  return (
    <div >
      
   <BrowserRouter>
      <Routes>
        {/* {public routes} */}  
        <Route  
          path='signin'
          element={<SignInPage/>}
        />
        <Route  
          path='signup'
          element={<SignUpPage/>}
        />

        {/* {protected routes} */}
         <Route  
          path='/'
          element={<HomePage/>}
        /> 
         <Route  
          path='/contact'
          element={<ContactPage/>}
        /> 
         <Route  
          path='/dashboard/*'
          element={<Dashboard/>}
        /> 
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
