import { useEffect, useMemo, useState } from 'react';
import { FiUsers, FiMail, FiShield, FiCheck, FiX, FiUserPlus, FiSearch } from 'react-icons/fi';
import { useAllUsers } from '@/queries/useProducts';
import { User } from '@/types';
import Pagination from '@/components/Pagination/Pagination';
import { usePagination } from '@/hooks/usePagination';

const USERS_PER_PAGE = 5;

const SuperAdminUsers = () => {
  const { data: users = [], isLoading } = useAllUsers();
  const [searchTerm, setSearchTerm] = useState('');

  const roleColors: Record<string, string> = {
    admin: 'bg-amber-100 text-amber-700',
    super_admin: 'bg-purple-100 text-purple-700',
    customer: 'bg-blue-100 text-blue-700',
  };

  const totalCustomers = users.filter((u) => u.role === 'customer').length;
  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalSuperAdmins = users.filter((u) => u.role === 'super_admin').length;

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return users;

    return users.filter((user) => {
      const searchableText = [
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        user.role.replace('_', ' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [searchTerm, users]);

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
  } = usePagination({ totalItems: filteredUsers.length, limit: USERS_PER_PAGE });

  useEffect(() => {
    goToPage(1);
  }, [searchTerm, goToPage]);

  const paginatedUsers = filteredUsers.slice(skip, skip + limit);

  const paginationSummary = filteredUsers.length
    ? `Showing ${skip + 1}–${Math.min(skip + limit, filteredUsers.length)} of ${filteredUsers.length} users`
    : 'No users found';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
          <p className="text-gray-500">Manage all registered users on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/40">
          <FiUserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading users...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-blue-100/40">
              <div className="flex items-center gap-3">
                <FiUsers className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-gradient-to-br from-green-500/20 to-green-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-green-100/40">
              <div className="flex items-center gap-3">
                <FiUserPlus className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-amber-100/40">
              <div className="flex items-center gap-3">
                <FiShield className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAdmins}</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-white/40 rounded-3xl p-5 shadow-lg shadow-purple-100/40">
              <div className="flex items-center gap-3">
                <FiShield className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Super Admins</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSuperAdmins}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>

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
                              <p className="font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </p>
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
                          <span
                            className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                              roleColors[user.role] || 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {user.tokenVerified ? (
                            <span className="flex items-center gap-1.5 text-green-600">
                              <FiCheck className="w-4 h-4" /> Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-red-600">
                              <FiX className="w-4 h-4" /> Pending
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
        </>
      )}
    </div>
  );
};

export default SuperAdminUsers;
