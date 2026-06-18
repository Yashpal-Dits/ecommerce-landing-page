const GRAPHQL_URL =
  (import.meta.env.VITE_GRAPHQL_URL as string | undefined) ||
  'http://localhost:5000/graphql';

interface GraphqlResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export const graphqlRequest = async <
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>
>(
  query: string,
  variables?: TVariables
): Promise<TData> => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed (${response.status}): ${response.statusText}`
    );
  }

  const result = (await response.json()) as GraphqlResponse<TData>;

  if (result.errors?.length) {
    throw new Error(result.errors[0].message || 'GraphQL request failed');
  }

  if (!result.data) {
    throw new Error('GraphQL response did not include data');
  }

  return result.data;
};