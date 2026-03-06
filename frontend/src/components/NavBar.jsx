export default function Navbar() {
  return (
    <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">School Portal</h1>

      <button className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}