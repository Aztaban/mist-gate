import { ROLE_NAMES, ROLES } from '@config';
import useAuth from '@hooks/state/useAuth';
import {
  useToggleUserStatusMutation,
  useToggleEditorRoleMutation,
  useGetUserByIdQuery,
} from '@features/apiSlices/userApiSlice';

interface UserCardProps {
  userId: string;
}

const UserCard = ({ userId }: UserCardProps) => {
  const { isAdmin } = useAuth();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  const [toggleEditor, { isLoading: isTogglingEditor }] = useToggleEditorRoleMutation();
  const [toggleStatus, { isLoading: isTogglingStatus }] = useToggleUserStatusMutation();

  if (isLoading || !user) return <p>Loading user info…</p>;

  const handleToggleEditor = () => {
    const confirm = window.confirm(
      `Are you sure you want to ${user.roles.includes(ROLES.Editor) ? 'remove' : 'grant'} ${
        user.username
      } the Editor role?`
    );
    if (confirm) {
      toggleEditor({ userId: user.id });
    }
  };
  const handleToggleStatus = () => {
    const confirm = window.confirm(
      `Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} user ${user.username}?`
    );
    if (confirm) {
      toggleStatus({ userId: user.id });
    }
  };

  return (
    <div className="user-card">
      <p>
        Username: <strong>{user.username}</strong>
      </p>
      <p>
        Email: <strong>{user.email}</strong>
      </p>
      {user.phoneNumber && (
        <p>
          Phone: <strong>{user.phoneNumber}</strong>
        </p>
      )}
      <p>
        Roles: <strong>{user.roles.map((roleId) => ROLE_NAMES[roleId]).join(', ')}</strong>
      </p>
      {isAdmin && (
        <button className="btn back-btn" onClick={handleToggleEditor} disabled={isTogglingEditor}>
          {isTogglingEditor ? 'Processing...' : 'Toggle Editor Role'}
        </button>
      )}
      <p>
        Active: <strong>{user.isActive.toString()}</strong>
      </p>
      {isAdmin && (
        <button className="btn back-btn" onClick={handleToggleStatus} disabled={isTogglingStatus}>
          {isTogglingStatus ? 'Processing...' : user.isActive ? 'Deactivate' : 'Activate'}
        </button>
      )}
    </div>
  );
};

export default UserCard;
