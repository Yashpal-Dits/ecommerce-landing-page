import {
  FiActivity,
  FiCheck,
  FiDollarSign,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiUsers,
} from 'react-icons/fi';
import { AnalyticsSummaryCard } from '@/types';

export const analyticsIconMap: Record<string, typeof FiUsers> = {
  users: FiUsers,
  package: FiPackage,
  dollar: FiDollarSign,
  shoppingBag: FiShoppingBag,
  shield: FiShield,
  check: FiCheck,
  activity: FiActivity,
};

export const getAnalyticsIcon = (iconName: string) => {
  return analyticsIconMap[iconName] || FiActivity;
};

export const cardColorMap: Record<string, string> = {
  green: 'from-green-500/20 to-green-600/20 text-green-600 shadow-green-100/40',
  blue: 'from-blue-500/20 to-blue-600/20 text-blue-600 shadow-blue-100/40',
  purple: 'from-purple-500/20 to-purple-600/20 text-purple-600 shadow-purple-100/40',
  amber: 'from-amber-500/20 to-amber-600/20 text-amber-600 shadow-amber-100/40',
};

export const getCardColorClasses = (color: string) => {
  return cardColorMap[color] || cardColorMap.blue;
};

export const categoryBarColorMap: Record<string, string> = {
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
};

export const getCategoryBarColorClass = (color: string) => {
  return categoryBarColorMap[color] || 'bg-gray-500';
};

export const userBreakdownColorMap: Record<string, { bg: string; text: string; icon: string }> = {
  blue: {
    bg: 'bg-blue-50/50',
    text: 'text-blue-700',
    icon: 'text-blue-300',
  },
  amber: {
    bg: 'bg-amber-50/50',
    text: 'text-amber-700',
    icon: 'text-amber-300',
  },
  purple: {
    bg: 'bg-purple-50/50',
    text: 'text-purple-700',
    icon: 'text-purple-300',
  },
};

export const getUserBreakdownColorClasses = (color: string) => {
  return userBreakdownColorMap[color] || userBreakdownColorMap.blue;
};

export const roleColorMap: Record<string, { bar: string; text: string }> = {
  blue: {
    bar: 'bg-blue-500',
    text: 'text-blue-700',
  },
  amber: {
    bar: 'bg-amber-500',
    text: 'text-amber-700',
  },
  purple: {
    bar: 'bg-purple-500',
    text: 'text-purple-700',
  },
};

export const getRoleColorClasses = (color: string) => {
  return roleColorMap[color] || roleColorMap.blue;
};

export const formatMetricValue = (
  metric: string,
  metrics: Record<string, number>,
  currencyMetrics: string[] = []
) => {
  const value = metrics[metric] ?? 0;

  if (currencyMetrics.includes(metric)) {
    return `₹${value.toLocaleString()}`;
  }

  return value.toString();
};

export const formatAnalyticsChangeValue = (
  stat: AnalyticsSummaryCard,
  metrics: Record<string, number>
) => {
  if (stat.change) return stat.change;

  if (stat.changeMetric === 'verifiedUsersPercentage') {
    return `${metrics.totalUsers > 0 ? ((metrics.totalVerified / metrics.totalUsers) * 100).toFixed(0) : 0}%`;
  }

  if (stat.changeMetric === 'pendingUsersPercentage') {
    return `${metrics.totalUsers > 0 ? ((metrics.totalPending / metrics.totalUsers) * 100).toFixed(0) : 0}%`;
  }

  return '0%';
};
