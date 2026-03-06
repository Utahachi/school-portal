import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h2 className="text-lg font-bold mb-6">Menu</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/teachers">Teachers</Link>
        </li>

        <li>
          <Link to="/courses">Courses</Link>
        </li>
      </ul>
    </div>
  );
}