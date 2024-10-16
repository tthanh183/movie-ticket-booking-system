import { Navbar, Typography, Button, ListItem } from '@material-tailwind/react';
import { useUserStore } from '../stores/useUserStore';
import { Link } from 'react-router-dom';
import { CiLogin, CiLogout } from 'react-icons/ci';

const Header = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === 'admin';

  return (
    <Navbar className="mx-auto min-w-full px-4 py-2 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-black"
        >
          Silver Screen
        </Typography>
        <div className="hidden md:flex space-x-6">
          <Link to="/">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium text-black hover:text-gray-400"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                Home
              </ListItem>
            </Typography>
          </Link>
          <Link to="#">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium text-black hover:text-gray-400"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                About
              </ListItem>
            </Typography>
          </Link>
          <Link to="#">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium text-black hover:text-gray-400"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                Contact Us
              </ListItem>
            </Typography>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium text-black hover:text-gray-400"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  Admin
                </ListItem>
              </Typography>
            </Link>
          )}
        </div>
        <div className="hidden md:flex gap-4">
          {user ? (
            <>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 font-medium text-black hover:text-gray-400"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-3">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                      fill="#90A4AE"
                    />
                  </svg>
                  Account
                </ListItem>
              </Typography>
              <Button
                variant="text"
                size="sm"
                color="blue-gray"
                className="flex items-center gap-2 hover:text-gray-400"
                onClick={logout}
              >
                <CiLogout className="text-xl" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="text"
                  size="sm"
                  color="blue-gray"
                  className="flex items-center gap-2 hover:text-gray-400"
                >
                  <CiLogin className="text-xl" />
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="gradient"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
