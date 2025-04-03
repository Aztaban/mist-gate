import { useGetAllUsersQuery } from '@features/apiSlices/userApiSlice';
import { useState } from 'react';
import UserCard from './UserCard';

const UsersManager = () => {
  const { data = [], isLoading, isError } = useGetAllUsersQuery();
  const [search, setSearch] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  const filteredUsers = data.filter((user) => user.username?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="users-manager">
      <h2>Users Manager</h2>
      <div className="users-grid">
        <div className="search-user">
          <input
            type="text"
            placeholder="Search users"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredUsers.length === 0 || search === '' ? (
            <p>No users found.</p>
          ) : (
            <ul>
              {filteredUsers.slice(0, 5).map((user) => (
                <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedUserId && <UserCard userId={selectedUserId} />}
      </div>
    </div>
  );
};

export default UsersManager;
