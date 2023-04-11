import { UserContext } from "./UserContext"
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Account() {

const {user,response} = useContext(UserContext);

const [data,setdata] = useState([]);
let logarray=[];
let res=[];
let userinfo="";
let dat = [];


// console.log(user)

if(!user&&!response){return <Navigate to={'/login'}/>}


let {subpage} = useParams();

if(subpage===undefined){subpage='profile'}

function linkClasses(type=null){

    let classes = 'py- px-6'

    if (type === subpage){classes += ' bg-primary text-white rounded-full'}

return classes;

}


async function getComment() {


    res = await axios.get('http://localhost:5200/datas/')


   logarray=res.data;

//    console.log(logarray);

                    logarray.forEach(f => {if(f.user!=null)

                                            {if(f.user.email==user.email)
                    
                        {

                            userinfo={user:f.user,goodid:f.goodid,comment: f.comment, like:f.like,date:f.date};
                           
                            dat.push(userinfo)  
 
                            //   console.log(dat);
                              setdata(dat);

                        }                   }}

                                            )}
                    
                    
            
            // console.log(data)


        useEffect(() => {getComment()},[])


    return(
        
        <div > 

            <label className="text-2xl"> Welcome to your account page, {response.name}! </label>

        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">

        <Link className={linkClasses('profile')} to={'/account'}>My bookings</Link>
            <Link className={linkClasses('comments')} to={'/account/comments'}>My comment</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My places</Link>

        </nav>

        {subpage ==='profile' && (

            <div className="text-center max-w-lg mx-auto">

                Logged in as {response.name} ({response.email}) <br/>

                </div>)}


                {subpage ==='comments' && (

                <div className="text-center max-w-lg mx-auto">


            {data.length > 0 &&data.map(e => (

                <div> {e.comment} by user {e.user? e.user.email : " anonymous"} for good {e.goodid} at {e.date} </div>))}

                    </div>)}


        {subpage ==='places' && (

          <PlacesPage/>
          
          )}


        </div>
        
        )

}