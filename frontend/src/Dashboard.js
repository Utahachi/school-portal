export default function Dashboard() {
  const token = localStorage.getItem("accessToken");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to the School Portal</h1>

      {token ? (
        <p>You are logged in ✅</p>
      ) : (
        <p>No token found ❌</p>
      )}
    </div>
  );
}