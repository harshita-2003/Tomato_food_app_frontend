import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";

const MobileNavLinks = () => {
  const { user , logout } = useAuth0();

  return (
    <div className="flex flex-col space-y-3">
        <h2>
            {user?.email}
        </h2>
        <Separator />
        <Link 
            to="/manage-restaurant"
            className="flex bg-white items-center font-bold hover:text-orange-500"
        >
            Manage Restaurant
        </Link>
        <Separator />
        <Link 
            to="/user-profile"
            className="flex bg-white items-center font-bold hover:text-orange-500"
        >
            User Profile
        </Link>
        
        <Button 
            className="flex items-center px-3 font-bold hover:bg-gray-500" 
            onClick={() => logout()}
        >
            Log Out 
        </Button>
    </div>
);
};

export default MobileNavLinks;
