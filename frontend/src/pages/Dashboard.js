import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;