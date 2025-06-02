import { GraphQLClient } from 'graphql-request';

const USER_SERVICE_API_URL = process.env.NEXT_PUBLIC_USER_SERVICE_API_URL + "/graphql";

const graphqlClient = new GraphQLClient(USER_SERVICE_API_URL, {
  headers: {
    'Content-Type': 'application/json',
 
  },
});

export interface UserProfile {
  id: string; 
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  jobTitle: string;
  company: string;
  isVerified: boolean;
  role: string;
  enrolledCourseIds: string[];
}

export const api = {
  async getUserProfile(): Promise<UserProfile> {
    const query = `
      query {
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
    const { me } = await graphqlClient.request<{ me: UserProfile }>(query);
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
          role
          enrolledCourseIds
        }
      }
    `;


    const { updateUser } = await graphqlClient.request<{ updateUser: UserProfile }>(mutation, {
      updateUserInput: data,
    });
    return updateUser;
  },


  }
