import { FiUsers, FiShield, FiCheck, FiActivity, FiTrendingUp, FiAlertCircle, FiBarChart2, FiDollarSign, FiClock } from 'react-icons/fi';
import { useAllUsers } from '@/queries/useProducts';

const SuperAdminAnalytics = () => {
  const { data: users = [], isLoading } = useAllUsers();

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === 'admin' || u.role === 'super_admin').length;
  const totalVerified = users.filter((u) => u.tokenVerified).length;
  const totalPending = users.filter((u) => !u.tokenVerified).length;

  const stats = [
    { label: 'Total Users', value: totalUsers.toString(), change: '+12.5%', icon: FiUsers, color: 'blue' },
    { label: 'Active Admins', value: totalAdmins.toString(), change: '+3.2%', icon: FiShield, color: 'purple' },
    { label: 'Verified Users', value: totalVerified.toString(), change: `${totalUsers > 0 ? ((totalVerified/totalUsers)*100).toFixed(0) : 0}%`, icon: FiCheck, color: 'green' },
    { label: 'Pending Approval', value: totalPending.toString(), change: `${totalUsers > 0 ? ((totalPending/totalUsers)*100).toFixed(0) : 0}%`, icon: FiActivity, color: 'amber' },
  ];

  const colorMap: Record<string, string> = {
    green: 'from-green-500/20 to-green-600/20 text-green-600 shadow-green-100/40',
    blue: 'from-blue-500/20 to-blue-600/20 text-blue-600 shadow-blue-100/40',
    purple: 'from-purple-500/20 to-purple-600/20 text-purple-600 shadow-purple-100/40',
    amber: 'from-amber-500/20 to-amber-600/20 text-amber-600 shadow-amber-100/40',
  };

  const roleBreakdown = [
    { role: 'Customer', count: users.filter((u) => u.role === 'customer').length, icon: FiUsers, color: 'bg-blue-500', textColor: 'text-blue-700' },
    { role: 'Admin', count: users.filter((u) => u.role === 'admin').length, icon: FiShield, color: 'bg-amber-500', textColor: 'text-amber-700' },
    { role: 'Super Admin', count: users.filter((u) => u.role === 'super_admin').length, icon: FiShield, color: 'bg-purple-500', textColor: 'text-purple-700' },
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'shampy', time: '2 min ago', icon: FiUsers },
    { action: 'Admin role updated', user: 'Lisa Rose', time: '15 min ago', icon: FiShield },
    { action: 'User verified', user: 'johny rob', time: '1 hr ago', icon: FiCheck },
    { action: 'Profile updated', user: 'Devi Prasad', time: '3 hrs ago', icon: FiActivity },
    { action: 'New user registered', user: 'ethan', time: '5 hrs ago', icon: FiUsers },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">System Analytics</h1>
      <p className="text-gray-500 mb-8">Real-time overview of system health and user activity</p>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading analytics...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => {
              const colors = colorMap[stat.color];
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`backdrop-blur-sm bg-gradient-to-br ${colors} border border-white/40 rounded-3xl p-6 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-6 h-6" />
                    <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                      <FiTrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-6">User Role Breakdown</h2>
              <div className="space-y-6">
                {roleBreakdown.map((item) => {
                  const percentage = users.length > 0 ? (item.count / users.length) * 100 : 0;
                  return (
                    <div key={item.role}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm font-semibold text-gray-700">{item.role}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.count} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminAnalytics;
