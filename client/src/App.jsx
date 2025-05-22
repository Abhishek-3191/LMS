import Button from ".components/ui/button";


function App(){
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage/>}/>
    </Routes>
  );
}

export default App;