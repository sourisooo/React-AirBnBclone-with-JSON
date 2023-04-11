import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


export default function IndexPage() {
  const [places,setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5100/datas').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place.id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
         
          {place.addedPhotos.length > 0 && place.addedPhotos.map(e => (

     
        <div className="column">

         <img src={e} width="500" height="500"></img>
  

         </div>

  ))}

          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
            }

