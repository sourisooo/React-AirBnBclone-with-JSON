import { UserContext } from "./UserContext"
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PlacesPage from "./PlacesPage";


export default function Account() {

const {user,response} = useContext(UserContext);

if(!user&&!response){return <Navigate to={'/login'}/>}


let {subpage} = useParams();

if(subpage===undefined){subpage='profile'}

function linkClasses(type=null){

    let classes = 'py- px-6'

    if (type === subpage){classes += ' bg-primary text-white rounded-full'}

return classes;

}


    return(
        
        <div> account page for {response.name}

        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">

        <Link className={linkClasses('profile')} to={'/account'}>My bookings</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My places</Link>

        </nav>

        {subpage ==='profile' && (

            <div className="text-center max-w-lg mx-auto">

                Logged in as {response.name} ({response.email}) <br/>

                </div>)}


        {subpage ==='places' && (

          <PlacesPage/>
          
          )}


        </div>
        
        )

}