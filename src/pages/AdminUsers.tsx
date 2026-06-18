import { FiUsers, FiMail, FiShield, FiCheck, FiX } from 'react-icons/fi';
import { useAllUsers } from '@/queries/useProducts';
import { User } from '@/types';
import Pagination from '@/components/Pagination/Pagination';
import { usePagination } from '@/hooks/usePagination';

const USERS_PER_PAGE = 5;

const AdminUsers = () => {
  const { data: users = [], isLoading } = useAllUsers();

  const {
    page,
    skip,
    limit,
    totalPages,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({ totalItems: users.length, limit: USERS_PER_PAGE });

  const paginatedUsers = users.slice(skip, skip + limit);

  const paginationSummary = users.length
    ? `Showing ${skip + 1}–${Math.min(skip + limit, users.length)} of ${users.length} users`
    : 'No users found';

  const roleColors: Record<string, string> = {
    admin: 'bg-amber-100 text-amber-700',
    super_admin: 'bg-purple-100 text-purple-700',
    customer: 'bg-blue-100 text-blue-700',
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Manage Users</h1>
        <p className="text-gray-500 mb-8">Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Manage Users</h1>
      <p className="text-gray-500 mb-8">View and manage all registered users</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-blue-100/40">
          <div className="flex items-center gap-2 mb-2">
            <FiUsers className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-gray-600">Total Users</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="backdrop-blur-sm bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-amber-100/40">
          <div className="flex items-center gap-2 mb-2">
            <FiShield className="w-5 h-5 text-amber-600" />
            <p className="text-sm font-medium text-gray-600">Admins</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.filter((u) => u.role === 'admin').length}</p>
        </div>
        <div className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-purple-100/40">
          <div className="flex items-center gap-2 mb-2">
            <FiShield className="w-5 h-5 text-purple-600" />
            <p className="text-sm font-medium text-gray-600">Super Admins</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.filter((u) => u.role === 'super_admin').length}</p>
        </div>
        <div className="backdrop-blur-sm bg-gradient-to-br from-green-500/20 to-green-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-green-100/40">
          <div className="flex items-center gap-2 mb-2">
            <FiCheck className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-gray-600">Verified</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.filter((u) => u.tokenVerified).length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50/50">
                <th className="px-6 py-4 font-semibold text-gray-600">User</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Role</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {user.image ? (
                            <img src={user.image} alt={user.firstName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-gray-600">
                              {user.firstName?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMail className="w-3.5 h-3.5" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${roleColors[user.role] || 'bg-gray-100 text-gray-700'}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.tokenVerified ? (
                        <span className="flex items-center gap-1.5 text-green-600">
                          <FiCheck className="w-4 h-4" /> Yes
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-600">
                          <FiX className="w-4 h-4" /> No
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 pb-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrev={prevPage}
            summary={paginationSummary}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
