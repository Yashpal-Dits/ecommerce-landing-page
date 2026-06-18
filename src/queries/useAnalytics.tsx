import { useQuery } from '@tanstack/react-query';
import { fetchAdminAnalytics, fetchSuperAdminAnalytics } from '@/api';
import { AdminAnalyticsConfig, SuperAdminAnalyticsConfig } from '@/types';

export const useAdminAnalyticsConfig = () => {
  return useQuery<AdminAnalyticsConfig>({
    queryKey: ['analytics', 'admin'],
    queryFn: fetchAdminAnalytics,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSuperAdminAnalyticsConfig = () => {
  return useQuery<SuperAdminAnalyticsConfig>({
    queryKey: ['analytics', 'super-admin'],
    queryFn: fetchSuperAdminAnalytics,
    staleTime: 1000 * 60 * 10,
  });
};
