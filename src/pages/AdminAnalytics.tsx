import { FiTrendingUp, FiPackage, FiUsers, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useProducts, useAllUsers } from '@/queries/useProducts';
import { useAdminAnalyticsConfig } from '@/queries/useAnalytics';
import {
  formatMetricValue,
  getAnalyticsIcon,
  getCardColorClasses,
  getCategoryBarColorClass,
  getUserBreakdownColorClasses,
} from '@/lib/analyticsUi';

const AdminAnalytics = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: users = [], isLoading: usersLoading } = useAllUsers();
  const {
    data: analyticsConfig,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useAdminAnalyticsConfig();

  const isLoading = productsLoading || usersLoading || analyticsLoading;

  const metrics = {
    totalUsers: users.length,
    totalProducts: products.length,
    totalCatalogValue: products.reduce((sum, product) => sum + product.price, 0),
    totalCustomers: users.filter((user) => user.role === 'customer').length,
    totalAdmins: users.filter((user) => user.role === 'admin').length,
    totalSuperAdmins: users.filter((user) => user.role === 'super_admin').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (analyticsError || !analyticsConfig) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 border border-red-100 rounded-2xl">
        Failed to load analytics configuration. Please make sure json-server is running.
      </div>
    );
  }

  const categoryStats = analyticsConfig.productCategories.map((category) => ({
    ...category,
    count: products.filter((product) => product.category === category.name).length,
  }));

  const recentProducts = products.slice(-analyticsConfig.recentProductsLimit).reverse();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Analytics</h1>
      <p className="text-gray-500 mb-8">Overview of your store performance and metrics</p>

      {/* Stats Grid */}
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
                {stat.change && (
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <FiTrendingUp className="w-3 h-3" /> {stat.change}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {formatMetricValue(stat.metric, metrics, ['totalCatalogValue'])}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Products by Category */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiPackage className="w-5 h-5 text-gray-400" />
            Products by Category
          </h2>
          <div className="space-y-4">
            {categoryStats.map((category) => {
              const maxCount = Math.max(...categoryStats.map((item) => item.count));
              const percentage = maxCount > 0 ? (category.count / maxCount) * 100 : 0;

              return (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-bold text-gray-900">{category.count} products</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getCategoryBarColorClass(category.color)} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Products */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiClock className="w-5 h-5 text-gray-400" />
            Recent Products
          </h2>
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e5e7eb" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="%239ca3af" font-size="12">No Image</text></svg>';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Breakdown */}
      <div className="mt-8 backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-gray-400" />
          User Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {analyticsConfig.userBreakdown.map((item) => {
            const colors = getUserBreakdownColorClasses(item.color);

            return (
              <div key={item.id} className={`flex items-center justify-between p-4 ${colors.bg} rounded-xl`}>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">{item.label}</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>{formatMetricValue(item.metric, metrics)}</p>
                </div>
                <FiCheckCircle className={`w-8 h-8 ${colors.icon}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
