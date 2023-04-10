import { createContext, useEffect } from "react";
import {useContext, useState} from "react";
import axios from "axios";

export const UserContext= createContext({});

export function UserContextProvider({children}){

const [user,setUser]=useState(null);
const [response,setResponse]=useState(null);
// let response=[];

console.log(user);

useEffect(() => {

if (user) {axios.get('http://localhost:5000/datas/'+user.id).then((data)=> setResponse((data.data)),console.log(response))}



},[user])



return (


<UserContext.Provider value={{user,setUser,response,setResponse}}>

{children}

</UserContext.Provider>


);



}