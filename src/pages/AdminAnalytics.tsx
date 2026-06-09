import { FiDollarSign, FiTrendingUp, FiShoppingBag, FiPackage, FiUsers, FiActivity, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useProducts, useAllUsers } from '@/queries/useProducts';

const AdminAnalytics = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: users = [], isLoading: usersLoading } = useAllUsers();

  const isLoading = productsLoading || usersLoading;

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalCatalogValue = products.reduce((sum, p) => sum + p.price, 0);
  const totalCustomers = users.filter((u) => u.role === 'customer').length;

  const categoryStats = ['Streetwear', 'Denim', 'Sneakers', 'Outerwear', 'Accessories']
    .map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }));

  const barColors: Record<string, string> = {
    Streetwear: 'bg-amber-500',
    Denim: 'bg-blue-500',
    Sneakers: 'bg-green-500',
    Outerwear: 'bg-purple-500',
    Accessories: 'bg-pink-500',
  };

  const colorMap: Record<string, string> = {
    green: 'from-green-500/20 to-green-600/20 text-green-600 shadow-green-100/40',
    blue: 'from-blue-500/20 to-blue-600/20 text-blue-600 shadow-blue-100/40',
    purple: 'from-purple-500/20 to-purple-600/20 text-purple-600 shadow-purple-100/40',
    amber: 'from-amber-500/20 to-amber-600/20 text-amber-600 shadow-amber-100/40',
  };

  const recentProducts = products.slice(-6).reverse();

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Analytics</h1>
      <p className="text-gray-500 mb-8">Overview of your store performance and metrics</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Users', value: totalUsers.toString(), icon: FiUsers, color: 'blue' },
          { label: 'Total Products', value: totalProducts.toString(), icon: FiPackage, color: 'green' },
          { label: 'Catalog Value', value: `₹${totalCatalogValue.toLocaleString()}`, icon: FiDollarSign, color: 'purple' },
          { label: 'Customers', value: totalCustomers.toString(), icon: FiShoppingBag, color: 'amber' },
        ].map((stat) => {
          const colors = colorMap[stat.color];
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`backdrop-blur-sm bg-gradient-to-br ${colors} border border-white/40 rounded-3xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6" />
                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <FiTrendingUp className="w-3 h-3" /> +12%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
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
            {categoryStats.map((cat) => {
              const maxCount = Math.max(...categoryStats.map((c) => c.count));
              const percentage = maxCount > 0 ? (cat.count / maxCount) * 100 : 0;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    <span className="text-sm font-bold text-gray-900">{cat.count} products</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${barColors[cat.name] || 'bg-gray-500'} transition-all duration-500`}
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
          <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Customers</p>
              <p className="text-2xl font-bold text-blue-700">{totalCustomers}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-blue-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Admins</p>
              <p className="text-2xl font-bold text-amber-700">{users.filter((u) => u.role === 'admin').length}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-amber-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Super Admins</p>
              <p className="text-2xl font-bold text-purple-700">{users.filter((u) => u.role === 'super_admin').length}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
