import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";



export default function PlacePage() {

  const [place,setPlace] = useState(null);
  const [comment,setComment] = useState([]);
  const [like,setLike] = useState(false);
  const [nblike,setnbLike] = useState("");


  const {user,response} = useContext(UserContext);

  const {id} = useParams();

  const [data,setdata] = useState([]);
    let logarray=[];
    let log=[];
    let res=[];
    let resu=[];
    let userinfo="";
    let dat = [];
    let dot = [];
 
    // console.log(id);


    // console.log(user,response)


  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('http://localhost:5100/datas/'+id).then(response => {
      setPlace(response.data);
    });

  }, [id]);


  async function submitComment(ev) {

    // ev.preventDefault();

    let time = new Date;
  
    axios.post('http://localhost:5200/datas',{user,goodid:id,comment,like,date:time})
    setComment("");

  }


  async function getComment() {


    res = await axios.get('http://localhost:5200/datas/')


   logarray=res.data;

//    console.log(logarray);

                   logarray.filter(f => f.goodid==id).forEach( e => 



                           {

                           userinfo={user:e.user,goodid:id,comment: e.comment, like:e.like,date:e.date};
                           
                           dat.push(userinfo)  

                            //  console.log(dat);
                             setdata(dat);

                            

                           });}


      async function getlikenumber() {

        // console.log("inside getnumber")


    resu = await axios.get('http://localhost:5200/datas/')
    
   log=resu.data;

                   log.forEach(f => {if((f.like==true)&&(f.goodid==id))dot.push(f)})

                   console.log(dot,dot.length);

                   setnbLike(dot)


                }

// console.log(data);

// console.log(user);

// console.log(comment);

// console.log(nblike);

// console.log(data);


    function sublike(){

        setLike(true)


    }    


        useEffect(() => {getComment();getlikenumber()},[])


         if (!place) return '';



  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>{place.address} </a>
    
    
      <div>    


      {place.addedPhotos.length > 0 && place.addedPhotos.map(e => (

     
    <div className="column">

      <img src={e} width="500" height="500"></img>
  

    </div>))}

        </div>

      <div>
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}<br />
          Price: {place.price}
        </div>
        <div>
        
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>

      <div>

      <div>

        <label className="font-semibold text-2xl">Comments </label>
        <input type="text" value={comment} onChange={ev => setComment(ev.target.value)}/>

        </div>

        <br></br>

        {data.length > 0 &&data.map(e => (

    <div> {e.comment} by user {e.user? e.user.email : " anonymous"} at {e.date} </div>))}

        <br></br>

        <button  onClick={sublike} className="primary mb-4">Click me before clicking submit comment to add like</button>

        <br></br>

        <button onClick={submitComment} className="primary mb-4">Click me to add comment</button>

      

        <div>
        <label>As been like: {nblike.length} times  </label> 


        </div>
        
        <div>
        <label>Check in: </label>
        <input type="date"/>
        </div>

        <div>
        <label>Check out: </label>
        <input type="date"/>
        </div>

      <button  className="primary mt-4">Book this face</button>
    </div>
    </div>
  );
}