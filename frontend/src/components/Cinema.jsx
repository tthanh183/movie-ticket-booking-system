import { Button, Card, Typography } from '@material-tailwind/react';

const Cinema = () => {
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <div className="text-center mb-6">
        <Typography variant="h3" color="blue-gray" className="font-bold">
          Manage Cinemas
        </Typography>
      </div>

      {/* Buttons for Create and View Cinemas */}
      <div className="flex justify-center space-x-4 mb-8">
        <Button color="blue" size="lg" className="hover:bg-blue-700">
          + Create Cinema
        </Button>
        <Button color="gray" size="lg" className="hover:bg-gray-700">
          View Cinemas
        </Button>
      </div>

      {/* Cinema Form */}
      <Card shadow={true} className="p-6 max-w-lg mx-auto bg-white">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Create New Cinema
        </Typography>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Cinema Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter cinema name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Location
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter cinema location"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category
            </label>
            <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select a category</option>
              <option>Standard</option>
              <option>VIP</option>
            </select>
          </div>

          {/* Upload Image (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            color="blue"
            size="lg"
            fullWidth
            className="hover:bg-blue-700"
          >
            + Create Cinema
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Cinema;
