import { useGetAllUsersQuery } from "@features/apiSlices/userApiSlice"
import { useState } from "react";

const UsersManager = () => {
  const { data = [], isLoading, isError } = useGetAllUsersQuery();
  const [search, setSearch] = useState<string>('');

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  const filteredUsers = data.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Users Manager</h2>
      <input type="text" placeholder="Search users" value={search} onChange={(e) => setSearch(e.target.value)} />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {filteredUsers.slice(0, 5).map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsersManager
