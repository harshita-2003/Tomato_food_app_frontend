import { Link } from 'react-router-dom';
import { Pizza } from 'lucide-react';
import { Button } from './ui/button';

const NoOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="animate-bounce mb-8">
        <Pizza className="w-16 h-16 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800">No Food Orders Yet!</h2>
      <p className="text-gray-600 mt-4">Looks like you haven't placed any orders yet.</p>
      <p className="text-gray-600 mb-8">Why not explore our menu and treat yourself?</p>
      <Link to="/">
        <Button
          color="primary"
          className="mt-4 bg-blue-600 hover:bg-blue-700"
        >
          Explore Menu
        </Button>
      </Link>
    </div>
  );
};

export default NoOrder;
