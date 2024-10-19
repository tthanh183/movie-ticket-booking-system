import { useState } from 'react';

import { useUserStore } from '../stores/useUserStore';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, loading } = useUserStore();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputs);
    signup(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card
        color="white"
        shadow={true}
        className="p-8 w-full max-w-md md:max-w-lg lg:max-w-xl"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-center text-black"
        >
          Create your account
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal text-center text-black"
        >
          Nice to meet you! Enter your details to sign up.
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-black"
            >
              Full name
            </Typography>
            <Input
              size="lg"
              placeholder="John Doe"
              className="!border-blue-gray-200 focus:!border-blue-500"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="name"
              onChange={handleChange}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-black"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-blue-gray-200 focus:!border-blue-500"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="email"
              onChange={handleChange}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-black"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-blue-gray-200 focus:!border-blue-500"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="password"
              onChange={handleChange}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-black"
            >
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-blue-gray-200 focus:!border-blue-500"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <Button
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            fullWidth
            disabled={loading}
            type="submit"
          >
            {loading ? 'Loading...' : 'Sign up'}
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal text-black"
          >
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-500 hover:underline"
            >
              Log in
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
