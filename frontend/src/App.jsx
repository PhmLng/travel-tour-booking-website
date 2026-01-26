

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
          element={<ChatApp/>}
        /> 
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
