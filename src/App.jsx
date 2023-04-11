
import './App.css'
import IndexPage from './componants/IndexPage'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LoginPage from './componants/LoginPage'
import Layout from './componants/Layout'
import Register from './componants/Register'
import { UserContextProvider } from './componants/UserContext'
import Account from './componants/Account'
import PlacePage from './componants/IndividualPlace'

function App() {



  return (

    <UserContextProvider>
    <Routes>

      <Route path="/" element={<Layout/>}>
      
      <Route index element={<IndexPage/>}/>
      
      <Route path="/login" element={<LoginPage/>}/>

      <Route path="/register" element={<Register/>}/>

      <Route path="/account/:subpage?" element={<Account/>}/>

      <Route path="/account/:subpage/:action" element={<Account/>}/>

      <Route path="/place/:id" element={<PlacePage/>}/>

  

      </Route>
  
    </Routes>
    
    </UserContextProvider>


  )
}

export default App
