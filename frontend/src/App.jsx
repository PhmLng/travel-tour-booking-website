import { HomePage } from "./pages/HomePage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"


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
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
