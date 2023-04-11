import {Link, useParams} from "react-router-dom";
// import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";

import Perks from "./perks";

import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


export default function PlacesPage() {

const{action} =useParams();
const [title,setTitle] = useState('');
const [address,setAddress] = useState('');
const [addedPhotos,setAddedPhotos] = useState([]);
const [description,setDescription] = useState('');
const [perks,setPerks] = useState([]);
const [extraInfo,setExtraInfo] = useState('');
const [checkIn,setCheckIn] = useState('');
const [checkOut,setCheckOut] = useState('');
const [maxGuests,setMaxGuests] = useState(1);
const [price,setPrice] = useState(100);
const [redirect,setRedirect] = useState(false);

const {user,response} = useContext(UserContext);

const [photoLink,setPhotoLink] = useState('');
const [data,setdata] = useState([]);
let logarray=[];
let res=[];
let userinfo="";



function inputHeader(text) {
  return (
    <h2 className="text-2xl mt-4">{text}</h2>
  );
}
function inputDescription(text) {
  return (
    <p className="text-gray-500 text-sm">{text}</p>
  );
}
function preInput(header,description) {
  return (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );}

async function addPhotoByLink(ev){

  ev.preventDefault();

  setAddedPhotos(prev => {

    return [...prev,photoLink];


})}


  async function handleSubmit(ev) {

    ev.preventDefault();

  
    axios.post('http://localhost:5100/datas',{user,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price})


    
    setRedirect(true);


  }

  async function getplaces() {


     res = await axios.get('http://localhost:5100/datas/')

    logarray=res.data;

    console.log(logarray);

                    logarray.filter(f => f.user.email==response.email).forEach( e => 



                            {


                                      console.log(response.email,e.user.email);
                            userinfo={email: response.email, user:e.user,title:e.title,address:e.address,addedPhotos:e.addedPhotos,description:e.description,perks:e.perks,extraInfo:e.extraInfo,checkIn:e.checkIn,checkOut:e.checkOut,maxGuests:e.maxGuests,price:e.price};
                            
                         
                            setdata(prev => {

                              return [...prev,userinfo];})

                              console.log(data);

                            
                            });}
                        
               


                        useEffect(() => {getplaces();},[])


                      

console.log(data);

  if (redirect) {
    return <Navigate to={'/'} />
  }



  return (
    <div>

    {action !== 'new' && (
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>)}


        {action === 'new' && (
            <div>
   <form>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
        {preInput('Photos','more = better')}
        <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}placeholder="link"/>
        <button onClick={addPhotoByLink} className="primary w-inital bg-gray-200 px-4 rounded-2xl">Add photo </button>
        
        {addedPhotos.length > 0 && addedPhotos.map(e => (

            <div>

              {e}<br></br>

            </div>


          ))}
        
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks','select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra info','house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button onClick={handleSubmit} className="primary my-4">Save</button>
      </form>
    </div>

        )}



<input type="text" value={"Your Places shared with our community"} disabled={true} />


{data.map(e =>  
      
      
      <div>
   <form>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={e.email} disabled={true} />
        {preInput('Address', 'Address to this place')}
        <input type="text" value={e.address} disabled={true}/>
        {preInput('Photos','more = better')}
        <input type="text" value={e.addedPhotos}disabled={true} />
    
        
        {preInput('Description','description of the place')}
        <textarea value={e.description}  />
        {preInput('Perks','select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

        </div>
        {preInput('Extra info','house rules, etc')}
        <textarea value={e.extraInfo} />
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={e.checkIn}
                   disabled={true}
 
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={e.checkOut}
                   disabled={true}
      
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={e.maxGuests} disabled={true}
                  />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={e.price} disabled={true}  />
       
          </div>
        </div>
    
      </form>
    </div>
      
    
      )}
    





        </div>

  );}


