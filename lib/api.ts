// lib/api.ts

import { GraphQLClient } from 'graphql-request';

function getGraphqlClient() {
  const token = localStorage.getItem('token');

  return new GraphQLClient(
    process.env.NEXT_PUBLIC_USER_SERVICE_API_URL || 'http://localhost:3002/graphql',
    {
      fetch: (url, options) => {
        // Ensure options.headers is safely spread and the new header is added
        const newHeaders = {
          ...options?.headers, // Start with headers provided by graphql-request
          'Authorization': token ? `Bearer ${token}` : '',
          'apollo-require-preflight': '1', // Ensure this is always sent for CSRF
          'Content-Type': 'application/json', // <--- Set Content-Type explicitly and last
        };

        return fetch(url, {
          ...options,
          credentials: 'include',
          headers: newHeaders, // Use the carefully constructed newHeaders
        });
      }
    }
  );
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  jobTitle: string | null;
  company: string | null;
  role: string;
  enrolledCourseIds: string[] | null;
}

export const api = {
  async getUserProfile(): Promise<UserProfile> {
    const query = `
      query GetUserProfile { 
        me {
          id
          username
          email
          firstName
          lastName
          bio
          jobTitle
          company
          role
          enrolledCourseIds
        }
      }
    `;
    const client = getGraphqlClient();
    const { me } = await client.request<{ me: UserProfile }>(query);
    return me;
  },

  async updateUserProfile(data: Partial<UserProfile> & { id: string }): Promise<UserProfile> {
    const mutation = `
      mutation UpdateUser($updateUserInput: UpdateUserInput!) { 
        updateUser(updateUserInput: $updateUserInput) {
          id
          username
          email
          firstName
          lastName
          bio
          jobTitle
          company
          isVerified
          role
          enrolledCourseIds
        }
      }
    `;
    const client = getGraphqlClient();
    const { updateUser } = await client.request<{ updateUser: UserProfile }>(mutation, {
      updateUserInput: data,
    });
    return updateUser;
  },
};