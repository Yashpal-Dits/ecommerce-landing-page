import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createSchema, createYoga } from 'graphql-yoga';

const PORT = Number(process.env.GRAPHQL_PORT || 5000);
const dbUrl = new URL('../db.json', import.meta.url);

const readDb = async () => {
  const db = await readFile(dbUrl, 'utf-8');
  return JSON.parse(db);
};

const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String
    role: String!
    image: String
    tokenVerified: Boolean
  }

  type Product {
    id: Int!
    name: String!
    category: String!
    price: Int!
    image: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
    usersByRole(role: String!): [User!]!

    products: [Product!]!
    product(id: Int!): Product
    productsByCategory(category: String!): [Product!]!
  }
`;

const normalizeText = (value) => String(value || '').trim().toLowerCase();

const resolvers = {
  Query: {
    users: async () => {
      const db = await readDb();
      return db.users || [];
    },

    user: async (_, { id }) => {
      const db = await readDb();
      return (db.users || []).find((user) => String(user.id) === String(id)) || null;
    },

    userByEmail: async (_, { email }) => {
      const db = await readDb();
      const normalizedEmail = normalizeText(email);

      return (
        (db.users || []).find(
          (user) => normalizeText(user.email) === normalizedEmail
        ) || null
      );
    },

    usersByRole: async (_, { role }) => {
      const db = await readDb();
      const normalizedRole = normalizeText(role);

      return (db.users || []).filter(
        (user) => normalizeText(user.role) === normalizedRole
      );
    },

    products: async () => {
      const db = await readDb();
      return db.products || [];
    },

    product: async (_, { id }) => {
      const db = await readDb();

      return (
        (db.products || []).find(
          (product) => Number(product.id) === Number(id)
        ) || null
      );
    },

    productsByCategory: async (_, { category }) => {
      const db = await readDb();
      const normalizedCategory = normalizeText(category);

      return (db.products || []).filter(
        (product) => normalizeText(product.category) === normalizedCategory
      );
    },
  },
};

const yoga = createYoga({
  graphqlEndpoint: '/graphql',
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  },
});

const server = createServer(yoga);

server.listen(PORT, () => {
console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});