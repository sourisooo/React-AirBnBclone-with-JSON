import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [reslog,setResLog] = useState("");

 const {setUser} = useContext(UserContext);


let response=[];
let logarray=[];
let userinfo="";

  async function handleLoginSubmit(ev) {

    ev.preventDefault();
     response = await axios.get('http://localhost:5000/datas/')

    logarray=response.data;


                    logarray.every(f => 
                        
                        {
                            if((f.email==(email))&&(f.password==(password)))
                        
                        {
                
                            console.log(email,f.email,password,f.password,f.id);
                            userinfo={email: email, password:password, id:f.id};
                            setUser(userinfo);
                            setResLog("You have successly access to the database!");
                            setRedirect(true);
                           return false;
                
                        }
                        
                     
                        {errorLog()};
                        // Make sure you return true. If you don't return a value, `every()` will stop.
                        return true;
                        
                    
                        });
                
                
            
  }


  const errorLog = () =>

{

    // console.log("Login and Password dont match with the database");

    // console.log("result: "+reslog);

    setResLog("Login and Password dont match with the database");
    setEmail('');setPassword('');
   

}



  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
            <input className="text-center py-2 text-gray-500" type="result"
                disabled={true}
                 value={reslog}
             />

          </div>
        </form>
      </div>
    </div>
  );
  }