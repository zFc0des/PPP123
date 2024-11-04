const TailwindTest = () => {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        {/* Basic Styling Test */}
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h2>
  
        {/* Button Tests */}
        <div className="space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Basic Button
          </button>
  
          {/* Custom Classes Test */}
          <button className="btn-primary w-full">
            Custom Primary Button
          </button>
  
          <button className="btn-secondary w-full">
            Custom Secondary Button
          </button>
        </div>
  
        {/* Color & Padding Test */}
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-gray-700">
            If you see this styled nicely, Tailwind is working!
          </p>
        </div>
      </div>
    );
  };
  
  export default TailwindTest;