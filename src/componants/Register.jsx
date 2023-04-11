import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
// import {UserContext} from "../UserContext.jsx";

export default function Register() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
//   const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(ev) {

    ev.preventDefault();
    axios.post('http://localhost:5000/datas',{name,email,password})
    setRedirect(true);


  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <input type="name"
                 placeholder="your name"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Allready a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
  }