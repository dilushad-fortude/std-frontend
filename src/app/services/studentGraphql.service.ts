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
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};




/** All input for the create `Student` mutation. */
export type CreateStudentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Student` to be created by this mutation. */
  student: StudentInput;
};

/** The output of our create `Student` mutation. */
export type CreateStudentPayload = {
  __typename?: 'CreateStudentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Student` that was created by this mutation. */
  student?: Maybe<Student>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Student`. May be used by Relay 1. */
  studentEdge?: Maybe<StudentsEdge>;
};


/** The output of our create `Student` mutation. */
export type CreateStudentPayloadStudentEdgeArgs = {
  orderBy?: Maybe<Array<StudentsOrderBy>>;
};



/** All input for the `deleteStudentById` mutation. */
export type DeleteStudentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deleteStudent` mutation. */
export type DeleteStudentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Student` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Student` mutation. */
export type DeleteStudentPayload = {
  __typename?: 'DeleteStudentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Student` that was deleted by this mutation. */
  student?: Maybe<Student>;
  deletedStudentId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Student`. May be used by Relay 1. */
  studentEdge?: Maybe<StudentsEdge>;
};


/** The output of our delete `Student` mutation. */
export type DeleteStudentPayloadStudentEdgeArgs = {
  orderBy?: Maybe<Array<StudentsOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Student`. */
  createStudent?: Maybe<CreateStudentPayload>;
  /** Updates a single `Student` using its globally unique id and a patch. */
  updateStudent?: Maybe<UpdateStudentPayload>;
  /** Updates a single `Student` using a unique key and a patch. */
  updateStudentById?: Maybe<UpdateStudentPayload>;
  /** Deletes a single `Student` using its globally unique id. */
  deleteStudent?: Maybe<DeleteStudentPayload>;
  /** Deletes a single `Student` using a unique key. */
  deleteStudentById?: Maybe<DeleteStudentPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStudentArgs = {
  input: CreateStudentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStudentArgs = {
  input: UpdateStudentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStudentByIdArgs = {
  input: UpdateStudentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStudentArgs = {
  input: DeleteStudentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStudentByIdArgs = {
  input: DeleteStudentByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Student`. */
  allStudents?: Maybe<StudentsConnection>;
  studentById?: Maybe<Student>;
  /** Reads a single `Student` using its globally unique `ID`. */
  student?: Maybe<Student>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllStudentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<StudentsOrderBy>>;
  condition?: Maybe<StudentCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStudentByIdArgs = {
  id: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStudentArgs = {
  nodeId: Scalars['ID'];
};

export type Student = Node & {
  __typename?: 'Student';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['BigInt'];
  name: Scalars['String'];
  dob: Scalars['Datetime'];
  email: Scalars['String'];
};

/** A condition to be used against `Student` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type StudentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `dob` field. */
  dob?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Student` */
export type StudentInput = {
  id?: Maybe<Scalars['BigInt']>;
  name: Scalars['String'];
  dob: Scalars['Datetime'];
  email: Scalars['String'];
};

/** Represents an update to a `Student`. Fields that are set will be updated. */
export type StudentPatch = {
  id?: Maybe<Scalars['BigInt']>;
  name?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Datetime']>;
  email?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Student` values. */
export type StudentsConnection = {
  __typename?: 'StudentsConnection';
  /** A list of `Student` objects. */
  nodes: Array<Maybe<Student>>;
  /** A list of edges which contains the `Student` and cursor to aid in pagination. */
  edges: Array<StudentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Student` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Student` edge in the connection. */
export type StudentsEdge = {
  __typename?: 'StudentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Student` at the end of the edge. */
  node?: Maybe<Student>;
};

/** Methods to use when ordering `Student`. */
export enum StudentsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  DobAsc = 'DOB_ASC',
  DobDesc = 'DOB_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `updateStudentById` mutation. */
export type UpdateStudentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Student` being updated. */
  studentPatch: StudentPatch;
  id: Scalars['BigInt'];
};

/** All input for the `updateStudent` mutation. */
export type UpdateStudentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Student` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Student` being updated. */
  studentPatch: StudentPatch;
};

/** The output of our update `Student` mutation. */
export type UpdateStudentPayload = {
  __typename?: 'UpdateStudentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Student` that was updated by this mutation. */
  student?: Maybe<Student>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Student`. May be used by Relay 1. */
  studentEdge?: Maybe<StudentsEdge>;
};


/** The output of our update `Student` mutation. */
export type UpdateStudentPayloadStudentEdgeArgs = {
  orderBy?: Maybe<Array<StudentsOrderBy>>;
};

export type GetOneStudentQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type GetOneStudentQuery = (
  { __typename?: 'Query' }
  & { studentById?: Maybe<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'name' | 'dob' | 'email'>
  )> }
);

export type RemoveStudentMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type RemoveStudentMutation = (
  { __typename?: 'Mutation' }
  & { deleteStudentById?: Maybe<(
    { __typename?: 'DeleteStudentPayload' }
    & { student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id'>
    )> }
  )> }
);

export type GetAllStudentsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStudentsQueryQuery = (
  { __typename?: 'Query' }
  & { allStudents?: Maybe<(
    { __typename?: 'StudentsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'name' | 'dob' | 'email'>
    )>> }
  )> }
);

export const GetOneStudentDocument = gql`
    query getOneStudent($id: BigInt!) {
  studentById(id: $id) {
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
export const RemoveStudentDocument = gql`
    mutation removeStudent($id: BigInt!) {
  deleteStudentById(input: {id: $id}) {
    student {
      id
    }
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
export const GetAllStudentsQueryDocument = gql`
    query GetAllStudentsQuery {
  allStudents {
    nodes {
      id
      name
      dob
      email
    }
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