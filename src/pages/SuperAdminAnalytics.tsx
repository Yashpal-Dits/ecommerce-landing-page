import { FiTrendingUp } from 'react-icons/fi';
import { useAllUsers } from '@/queries/useProducts';
import { useSuperAdminAnalyticsConfig } from '@/queries/useAnalytics';
import {
  formatAnalyticsChangeValue,
  formatMetricValue,
  getAnalyticsIcon,
  getCardColorClasses,
  getRoleColorClasses,
} from '@/lib/analyticsUi';

const SuperAdminAnalytics = () => {
  const { data: users = [], isLoading: usersLoading } = useAllUsers();
  const {
    data: analyticsConfig,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useSuperAdminAnalyticsConfig();

  const metrics = {
    totalUsers: users.length,
    totalAdmins: users.filter((user) => user.role === 'admin' || user.role === 'super_admin').length,
    totalVerified: users.filter((user) => user.tokenVerified).length,
    totalPending: users.filter((user) => !user.tokenVerified).length,
  };

  const isLoading = usersLoading || analyticsLoading;

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">System Analytics</h1>
        <p className="text-gray-500 mb-8">Real-time overview of system health and user activity</p>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (analyticsError || !analyticsConfig) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">System Analytics</h1>
        <p className="text-gray-500 mb-8">Real-time overview of system health and user activity</p>
        <div className="p-6 text-center text-red-600 bg-red-50 border border-red-100 rounded-2xl">
          Failed to load analytics configuration. Please make sure json-server is running.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">System Analytics</h1>
      <p className="text-gray-500 mb-8">Real-time overview of system health and user activity</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {analyticsConfig.summaryCards.map((stat) => {
          const Icon = getAnalyticsIcon(stat.icon);

          return (
            <div
              key={stat.id}
              className={`backdrop-blur-sm bg-gradient-to-br ${getCardColorClasses(stat.color)} border border-white/40 rounded-3xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6" />
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <FiTrendingUp className="w-3 h-3" />
                  {formatAnalyticsChangeValue(stat, metrics)}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {formatMetricValue(stat.metric, metrics)}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-6">User Role Breakdown</h2>
          <div className="space-y-6">
            {analyticsConfig.roleBreakdown.map((item) => {
              const count = users.filter((user) => user.role === item.role).length;
              const percentage = users.length > 0 ? (count / users.length) * 100 : 0;
              const colors = getRoleColorClasses(item.color);

              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${colors.bar}`} />
                      <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${colors.bar} transition-all duration-500`}
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
            {analyticsConfig.recentActivity.map((activity) => {
              const Icon = getAnalyticsIcon(activity.icon);

              return (
                <div
                  key={activity.id}
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
    </div>
  );
};

export default SuperAdminAnalytics;
