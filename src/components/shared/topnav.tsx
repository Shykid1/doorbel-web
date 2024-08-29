import { Link } from "react-router-dom";
import { topnavItems } from "@/constants";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { CircleUser, Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const Topnav = () => {
  const user = localStorage.getItem("user");

  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6  left-0 right-0 z-50">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:gap-5 md:items-center md:text-sm lg:gap-6">
        <Link to="/" className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-20" />
        </Link>
        {topnavItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center">
              <img src="logo.png" alt="Logo" className="h-20" />
            </Link>
            {topnavItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 sm:w-[300px] md:[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!user ? (
              <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuLabel>Support</DropdownMenuLabel>
                <DropdownMenuLabel>Logout</DropdownMenuLabel>
              </>
            ) : (
              <>
                <Link to="/auth" className="block">
                  <DropdownMenuLabel>Login</DropdownMenuLabel>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topnav;
