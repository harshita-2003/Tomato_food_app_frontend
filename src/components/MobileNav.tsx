import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user} = useAuth0();
  

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle className="text-orange-600 text-lg">
            {isAuthenticated ? (
                <span> Welcome {user?.name} ! </span>
            ) : (
                <span> Welcome to Tomato.com! </span>
            )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500 hover:bg-orange-600"
            >
              LOG IN
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
