//To have access to auth0 hook it calls createuser api 

import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  // Stores the state value if state changes , 
  // doesnot trigger component to re-render
  // useState hook - rerender each component including useeffect
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      console.log("Creating user with:", { auth0Id: user.sub, email: user.email });
      createUser({ auth0Id: user.sub, email: user.email }).then(() => {
        console.log("User created successfully from frontend");
      }).catch((error) => {
        console.error("Error creating user from frontend:", error);
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);
  

  return <>Loading...</>;
};

export default AuthCallbackPage;