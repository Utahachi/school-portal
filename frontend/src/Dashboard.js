import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}