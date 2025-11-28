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
    <section className="admin-panel admin-panel--manager users-manager">
      <header className="admin-panel__header">
        <h2 className="admin-panel__title">Users Manager</h2>
      </header>

      <div className="admin-panel__body manager-grid users-grid">
        <div className="manager-grid__col manager-grid__col--list">
          <div className="search-user">
            <input
              type="text"
              placeholder="Search users"
              className="header-search"
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
        </div>

        <div className="manager-grid__col manager-grid__col--detail">
          {selectedUserId ? (
            <UserCard userId={selectedUserId} />
          ) : (
            <p className="users-placeholder">Select a user from the list to see details.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UsersManager;
