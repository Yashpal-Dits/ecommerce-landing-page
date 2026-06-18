import { Product, User } from '@/types';
import { graphqlRequest } from './graphqlClient';

const USER_FIELDS = `
  id
  firstName
  lastName
  username
  email
  password
  role
  image
  tokenVerified
`;

const PRODUCT_FIELDS = `
  id
  name
  category
  price
  image
`;

export const fetchAllUsersGraphql = async (): Promise<User[]> => {
  const data = await graphqlRequest<{ users: User[] }>(`
    query Users {
      users {
        ${USER_FIELDS}
      }
    }
  `);

  return data.users;
};

export const fetchUserByIdGraphql = async (
  id: string
): Promise<User | null> => {
  const data = await graphqlRequest<{ user: User | null }, { id: string }>(
    `
      query User($id: ID!) {
        user(id: $id) {
          ${USER_FIELDS}
        }
      }
    `,
    { id }
  );

  return data.user;
};

export const fetchUserByEmailGraphql = async (
  email: string
): Promise<User | null> => {
  const data = await graphqlRequest<
    { userByEmail: User | null },
    { email: string }
  >(
    `
      query UserByEmail($email: String!) {
        userByEmail(email: $email) {
          ${USER_FIELDS}
        }
      }
    `,
    { email }
  );

  return data.userByEmail;
};

export const fetchUsersByRoleGraphql = async (
  role: string
): Promise<User[]> => {
  const data = await graphqlRequest<
    { usersByRole: User[] },
    { role: string }
  >(
    `
      query UsersByRole($role: String!) {
        usersByRole(role: $role) {
          ${USER_FIELDS}
        }
      }
    `,
    { role }
  );

  return data.usersByRole;
};

export const fetchProductsGraphql = async (): Promise<Product[]> => {
  const data = await graphqlRequest<{ products: Product[] }>(`
    query Products {
      products {
        ${PRODUCT_FIELDS}
      }
    }
  `);

  return data.products;
};

export const fetchProductByIdGraphql = async (
  id: number
): Promise<Product | undefined> => {
  const data = await graphqlRequest<
    { product: Product | null },
    { id: number }
  >(
    `
      query Product($id: Int!) {
        product(id: $id) {
          ${PRODUCT_FIELDS}
        }
      }
    `,
    { id }
  );

  return data.product || undefined;
};

export const fetchProductsByCategoryGraphql = async (
  category: string
): Promise<Product[]> => {
  const data = await graphqlRequest<
    { productsByCategory: Product[] },
    { category: string }
  >(
    `
      query ProductsByCategory($category: String!) {
        productsByCategory(category: $category) {
          ${PRODUCT_FIELDS}
        }
      }
    `,
    { category }
  );

  return data.productsByCategory;
};