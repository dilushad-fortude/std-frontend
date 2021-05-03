import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type Mutation = {
  __typename?: 'Mutation';
  createStudent: Student;
  updateStudent: UpdateStudentDto;
  deleteStudent: Student;
};


export type MutationCreateStudentArgs = {
  input: StudentInput;
};


export type MutationUpdateStudentArgs = {
  input: StudentInput;
  id: Scalars['String'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findStudent: Student;
  findAllStudents: Array<Student>;
};


export type QueryFindStudentArgs = {
  id: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  name: Scalars['String'];
  dob: Scalars['String'];
  email: Scalars['String'];
};

export type StudentInput = {
  name: Scalars['String'];
  dob: Scalars['String'];
  email: Scalars['String'];
};

export type UpdateStudentDto = {
  __typename?: 'UpdateStudentDto';
  id: Scalars['Int'];
};

export type GetOneStudentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetOneStudentQuery = (
  { __typename?: 'Query' }
  & {
    findStudent: (
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'name' | 'dob' | 'email'>
    )
  }
);

export type GetAllStudentsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStudentsQueryQuery = (
  { __typename?: 'Query' }
  & {
    findAllStudents: Array<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'name' | 'email' | 'dob'>
    )>
  }
);

export type RemoveStudentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveStudentMutation = (
  { __typename?: 'Mutation' }
  & {
    deleteStudent: (
      { __typename?: 'Student' }
      & Pick<Student, 'id'>
    )
  }
);

export type UpdateStudentMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  dob: Scalars['String'];
}>;


export type UpdateStudentMutation = (
  { __typename?: 'Mutation' }
  & {
    updateStudent: (
      { __typename?: 'UpdateStudentDto' }
      & Pick<UpdateStudentDto, 'id'>
    )
  }
);

export const GetOneStudentDocument = gql`
    query getOneStudent($id: String!) {
  findStudent(id: $id) {
    id
    name
    dob
    email
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class GetOneStudentGQL extends Apollo.Query<GetOneStudentQuery, GetOneStudentQueryVariables> {
  document = GetOneStudentDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetAllStudentsQueryDocument = gql`
    query GetAllStudentsQuery {
  findAllStudents {
    id
    name
    email
    dob
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class GetAllStudentsQueryGQL extends Apollo.Query<GetAllStudentsQueryQuery, GetAllStudentsQueryQueryVariables> {
  document = GetAllStudentsQueryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RemoveStudentDocument = gql`
    mutation removeStudent($id: String!) {
  deleteStudent(id: $id) {
    id
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class RemoveStudentGQL extends Apollo.Mutation<RemoveStudentMutation, RemoveStudentMutationVariables> {
  document = RemoveStudentDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateStudentDocument = gql`
    mutation updateStudent($id: String!, $name: String!, $email: String!, $dob: String!) {
  updateStudent(input: {email: $email, dob: $dob, name: $name}, id: $id) {
    id
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class UpdateStudentGQL extends Apollo.Mutation<UpdateStudentMutation, UpdateStudentMutationVariables> {
  document = UpdateStudentDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}