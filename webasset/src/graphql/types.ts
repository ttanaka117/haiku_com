import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type EdgeInfo = {
  __typename?: 'EdgeInfo';
  cursor?: Maybe<Scalars['Int']['output']>;
};

export type Haiku = {
  __typename?: 'Haiku';
  author?: Maybe<Poet>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  kigo?: Maybe<Array<Maybe<Kigo>>>;
  letterBody?: Maybe<Scalars['String']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  textKana?: Maybe<Scalars['String']['output']>;
};

export type HaikuConnection = {
  __typename?: 'HaikuConnection';
  edges: Array<HaikuEdge>;
  pageInfo: PageInfo;
};

export type HaikuEdge = {
  __typename?: 'HaikuEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Haiku>;
};

export type HaikuQuery = {
  __typename?: 'HaikuQuery';
  items?: Maybe<Array<Maybe<Haiku>>>;
  pageInfo?: Maybe<EdgeInfo>;
};

export type InputLetter = {
  address?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  letterBody?: InputMaybe<Scalars['String']['input']>;
  letterBodyType?: InputMaybe<Scalars['String']['input']>;
  likesCount?: InputMaybe<Scalars['Int']['input']>;
  penname?: InputMaybe<Scalars['String']['input']>;
};

export type Kigo = {
  __typename?: 'Kigo';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nameKana?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['String']['output']>;
};

export type Letter = {
  __typename?: 'Letter';
  address?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  letterBody?: Maybe<Scalars['String']['output']>;
  letterBodyType?: Maybe<Scalars['String']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  penname?: Maybe<Scalars['String']['output']>;
  poet?: Maybe<Poet>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createHaiku?: Maybe<CreateHaikuResponse>;
  createPoet?: Maybe<Poet>;
  createSearchLetter?: Maybe<Scalars['Boolean']['output']>;
  doneHaiku?: Maybe<Scalars['Boolean']['output']>;
  likeHaiku?: Maybe<LikeHaikuResponse>;
};


export type MutationCreateHaikuArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatePoetArgs = {
  birthYear?: InputMaybe<Scalars['String']['input']>;
  diedYear?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSearchLetterArgs = {
  inputLetter?: InputMaybe<InputLetter>;
};


export type MutationDoneHaikuArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLikeHaikuArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Poet = {
  __typename?: 'Poet';
  birthYear?: Maybe<Scalars['Int']['output']>;
  diedYear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nameKana?: Maybe<Scalars['String']['output']>;
};

export type Prefecture = {
  __typename?: 'Prefecture';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nameKana?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allHaikusCount: Scalars['Int']['output'];
  haikus?: Maybe<HaikuConnection>;
  letter?: Maybe<Letter>;
  letters?: Maybe<Array<Maybe<Letter>>>;
  lettersByIds?: Maybe<Array<Maybe<Letter>>>;
  poets?: Maybe<Array<Maybe<Poet>>>;
  prefectures?: Maybe<Array<Maybe<Prefecture>>>;
  searchHaikus?: Maybe<Array<Maybe<Haiku>>>;
  searchLetters?: Maybe<Array<Maybe<Letter>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryHaikusArgs = {
  after: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
};


export type QueryLetterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLettersByIdsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type QuerySearchHaikusArgs = {
  searchHaikusInput?: InputMaybe<SearchHaikusInput>;
};


export type QuerySearchLettersArgs = {
  searchLettersInput?: InputMaybe<SearchLettersInput>;
};

export type SearchHaikusInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  textKana?: InputMaybe<Scalars['String']['input']>;
};

export type SearchLettersInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  letterBody?: InputMaybe<Scalars['String']['input']>;
  penname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateHaikuResponse = {
  __typename?: 'createHaikuResponse';
  description?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type LikeHaikuResponse = {
  __typename?: 'likeHaikuResponse';
  likesCount?: Maybe<Scalars['Int']['output']>;
};

export type PoetContentsFragment = { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null };

export type LetterContentsFragment = { __typename?: 'Letter', id?: number | null, penname?: string | null, age?: number | null, letterBody?: string | null, letterBodyType?: string | null, address?: string | null, likesCount?: number | null, description?: string | null, imageUrl?: string | null, poet?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null };

export type HaikuContentsFragment = { __typename?: 'Haiku', id?: number | null, text?: string | null, textKana?: string | null, description?: string | null, likesCount?: number | null, author?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null, kigo?: Array<{ __typename?: 'Kigo', id?: number | null, name?: string | null, nameKana?: string | null, season?: string | null } | null> | null };

export type LetterByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LetterByIdQuery = { __typename?: 'Query', letter?: { __typename?: 'Letter', id?: number | null, penname?: string | null, age?: number | null, letterBody?: string | null, letterBodyType?: string | null, address?: string | null, likesCount?: number | null, description?: string | null, imageUrl?: string | null, poet?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null } | null };

export type LettersByIdsQueryVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type LettersByIdsQuery = { __typename?: 'Query', lettersByIds?: Array<{ __typename?: 'Letter', id?: number | null, penname?: string | null, age?: number | null, letterBody?: string | null, letterBodyType?: string | null, address?: string | null, likesCount?: number | null, description?: string | null, imageUrl?: string | null, poet?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null } | null> | null };

export type LettersQueryVariables = Exact<{ [key: string]: never; }>;


export type LettersQuery = { __typename?: 'Query', letters?: Array<{ __typename?: 'Letter', id?: number | null, penname?: string | null, age?: number | null, letterBody?: string | null, letterBodyType?: string | null, address?: string | null, likesCount?: number | null, description?: string | null, imageUrl?: string | null, poet?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null } | null> | null };

export type HaikusQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  after: Scalars['Int']['input'];
}>;


export type HaikusQuery = { __typename?: 'Query', haikus?: { __typename?: 'HaikuConnection', edges: Array<{ __typename?: 'HaikuEdge', node?: { __typename?: 'Haiku', id?: number | null, text?: string | null, textKana?: string | null, description?: string | null, likesCount?: number | null, author?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null, kigo?: Array<{ __typename?: 'Kigo', id?: number | null, name?: string | null, nameKana?: string | null, season?: string | null } | null> | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type PoetsQueryVariables = Exact<{ [key: string]: never; }>;


export type PoetsQuery = { __typename?: 'Query', poets?: Array<{ __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null> | null };

export type SearchLettersQueryVariables = Exact<{
  searchLettersInput?: InputMaybe<SearchLettersInput>;
}>;


export type SearchLettersQuery = { __typename?: 'Query', searchLetters?: Array<{ __typename?: 'Letter', id?: number | null, penname?: string | null, age?: number | null, letterBody?: string | null, letterBodyType?: string | null, address?: string | null, likesCount?: number | null, description?: string | null, imageUrl?: string | null, poet?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null } | null> | null };

export type SearchHaikusQueryVariables = Exact<{
  searchHaikusInput?: InputMaybe<SearchHaikusInput>;
}>;


export type SearchHaikusQuery = { __typename?: 'Query', searchHaikus?: Array<{ __typename?: 'Haiku', id?: number | null, text?: string | null, textKana?: string | null, description?: string | null, likesCount?: number | null, author?: { __typename?: 'Poet', id: string, name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null, kigo?: Array<{ __typename?: 'Kigo', id?: number | null, name?: string | null, nameKana?: string | null, season?: string | null } | null> | null } | null> | null };

export type PoetMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  nameKana?: InputMaybe<Scalars['String']['input']>;
  birthYear?: InputMaybe<Scalars['String']['input']>;
  diedYear?: InputMaybe<Scalars['String']['input']>;
}>;


export type PoetMutation = { __typename?: 'Mutation', createPoet?: { __typename?: 'Poet', name?: string | null, nameKana?: string | null, birthYear?: number | null, diedYear?: number | null } | null };

export type CreateHaikuMutationVariables = Exact<{
  text?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateHaikuMutation = { __typename?: 'Mutation', createHaiku?: { __typename?: 'createHaikuResponse', text?: string | null, description?: string | null } | null };

export type CreateSearchLetterMutationVariables = Exact<{
  inputLetter?: InputMaybe<InputLetter>;
}>;


export type CreateSearchLetterMutation = { __typename?: 'Mutation', createSearchLetter?: boolean | null };

export type LikeHaikuMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LikeHaikuMutation = { __typename?: 'Mutation', likeHaiku?: { __typename?: 'likeHaikuResponse', likesCount?: number | null } | null };

export type DoneHaikuMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DoneHaikuMutation = { __typename?: 'Mutation', doneHaiku?: boolean | null };

export const PoetContentsFragmentDoc = gql`
    fragment PoetContents on Poet {
  id
  name
  nameKana
  birthYear
  diedYear
}
    `;
export const LetterContentsFragmentDoc = gql`
    fragment LetterContents on Letter {
  id
  penname
  poet {
    id
    name
    nameKana
    birthYear
    diedYear
  }
  age
  letterBody
  letterBodyType
  address
  likesCount
  description
  imageUrl
}
    `;
export const HaikuContentsFragmentDoc = gql`
    fragment HaikuContents on Haiku {
  id
  text
  textKana
  author {
    id
    name
    nameKana
    birthYear
    diedYear
  }
  kigo {
    id
    name
    nameKana
    season
  }
  description
  likesCount
}
    `;
export const LetterByIdDocument = gql`
    query LetterById($id: ID!) {
  letter(id: $id) {
    ...LetterContents
  }
}
    ${LetterContentsFragmentDoc}`;

/**
 * __useLetterByIdQuery__
 *
 * To run a query within a React component, call `useLetterByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLetterByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLetterByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLetterByIdQuery(baseOptions: Apollo.QueryHookOptions<LetterByIdQuery, LetterByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LetterByIdQuery, LetterByIdQueryVariables>(LetterByIdDocument, options);
      }
export function useLetterByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LetterByIdQuery, LetterByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LetterByIdQuery, LetterByIdQueryVariables>(LetterByIdDocument, options);
        }
export function useLetterByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LetterByIdQuery, LetterByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LetterByIdQuery, LetterByIdQueryVariables>(LetterByIdDocument, options);
        }
export type LetterByIdQueryHookResult = ReturnType<typeof useLetterByIdQuery>;
export type LetterByIdLazyQueryHookResult = ReturnType<typeof useLetterByIdLazyQuery>;
export type LetterByIdSuspenseQueryHookResult = ReturnType<typeof useLetterByIdSuspenseQuery>;
export type LetterByIdQueryResult = Apollo.QueryResult<LetterByIdQuery, LetterByIdQueryVariables>;
export const LettersByIdsDocument = gql`
    query LettersByIds($ids: [ID]) {
  lettersByIds(ids: $ids) {
    ...LetterContents
  }
}
    ${LetterContentsFragmentDoc}`;

/**
 * __useLettersByIdsQuery__
 *
 * To run a query within a React component, call `useLettersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLettersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLettersByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useLettersByIdsQuery(baseOptions?: Apollo.QueryHookOptions<LettersByIdsQuery, LettersByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LettersByIdsQuery, LettersByIdsQueryVariables>(LettersByIdsDocument, options);
      }
export function useLettersByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LettersByIdsQuery, LettersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LettersByIdsQuery, LettersByIdsQueryVariables>(LettersByIdsDocument, options);
        }
export function useLettersByIdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LettersByIdsQuery, LettersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LettersByIdsQuery, LettersByIdsQueryVariables>(LettersByIdsDocument, options);
        }
export type LettersByIdsQueryHookResult = ReturnType<typeof useLettersByIdsQuery>;
export type LettersByIdsLazyQueryHookResult = ReturnType<typeof useLettersByIdsLazyQuery>;
export type LettersByIdsSuspenseQueryHookResult = ReturnType<typeof useLettersByIdsSuspenseQuery>;
export type LettersByIdsQueryResult = Apollo.QueryResult<LettersByIdsQuery, LettersByIdsQueryVariables>;
export const LettersDocument = gql`
    query Letters {
  letters {
    ...LetterContents
  }
}
    ${LetterContentsFragmentDoc}`;

/**
 * __useLettersQuery__
 *
 * To run a query within a React component, call `useLettersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLettersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLettersQuery({
 *   variables: {
 *   },
 * });
 */
export function useLettersQuery(baseOptions?: Apollo.QueryHookOptions<LettersQuery, LettersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LettersQuery, LettersQueryVariables>(LettersDocument, options);
      }
export function useLettersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LettersQuery, LettersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LettersQuery, LettersQueryVariables>(LettersDocument, options);
        }
export function useLettersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LettersQuery, LettersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LettersQuery, LettersQueryVariables>(LettersDocument, options);
        }
export type LettersQueryHookResult = ReturnType<typeof useLettersQuery>;
export type LettersLazyQueryHookResult = ReturnType<typeof useLettersLazyQuery>;
export type LettersSuspenseQueryHookResult = ReturnType<typeof useLettersSuspenseQuery>;
export type LettersQueryResult = Apollo.QueryResult<LettersQuery, LettersQueryVariables>;
export const HaikusDocument = gql`
    query Haikus($limit: Int!, $after: Int!) {
  haikus(limit: $limit, after: $after) {
    edges {
      node {
        ...HaikuContents
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    ${HaikuContentsFragmentDoc}`;

/**
 * __useHaikusQuery__
 *
 * To run a query within a React component, call `useHaikusQuery` and pass it any options that fit your needs.
 * When your component renders, `useHaikusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHaikusQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useHaikusQuery(baseOptions: Apollo.QueryHookOptions<HaikusQuery, HaikusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HaikusQuery, HaikusQueryVariables>(HaikusDocument, options);
      }
export function useHaikusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HaikusQuery, HaikusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HaikusQuery, HaikusQueryVariables>(HaikusDocument, options);
        }
export function useHaikusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HaikusQuery, HaikusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HaikusQuery, HaikusQueryVariables>(HaikusDocument, options);
        }
export type HaikusQueryHookResult = ReturnType<typeof useHaikusQuery>;
export type HaikusLazyQueryHookResult = ReturnType<typeof useHaikusLazyQuery>;
export type HaikusSuspenseQueryHookResult = ReturnType<typeof useHaikusSuspenseQuery>;
export type HaikusQueryResult = Apollo.QueryResult<HaikusQuery, HaikusQueryVariables>;
export const PoetsDocument = gql`
    query Poets {
  poets {
    ...PoetContents
  }
}
    ${PoetContentsFragmentDoc}`;

/**
 * __usePoetsQuery__
 *
 * To run a query within a React component, call `usePoetsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoetsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePoetsQuery(baseOptions?: Apollo.QueryHookOptions<PoetsQuery, PoetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoetsQuery, PoetsQueryVariables>(PoetsDocument, options);
      }
export function usePoetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoetsQuery, PoetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoetsQuery, PoetsQueryVariables>(PoetsDocument, options);
        }
export function usePoetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PoetsQuery, PoetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PoetsQuery, PoetsQueryVariables>(PoetsDocument, options);
        }
export type PoetsQueryHookResult = ReturnType<typeof usePoetsQuery>;
export type PoetsLazyQueryHookResult = ReturnType<typeof usePoetsLazyQuery>;
export type PoetsSuspenseQueryHookResult = ReturnType<typeof usePoetsSuspenseQuery>;
export type PoetsQueryResult = Apollo.QueryResult<PoetsQuery, PoetsQueryVariables>;
export const SearchLettersDocument = gql`
    query SearchLetters($searchLettersInput: SearchLettersInput) {
  searchLetters(searchLettersInput: $searchLettersInput) {
    ...LetterContents
  }
}
    ${LetterContentsFragmentDoc}`;

/**
 * __useSearchLettersQuery__
 *
 * To run a query within a React component, call `useSearchLettersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLettersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLettersQuery({
 *   variables: {
 *      searchLettersInput: // value for 'searchLettersInput'
 *   },
 * });
 */
export function useSearchLettersQuery(baseOptions?: Apollo.QueryHookOptions<SearchLettersQuery, SearchLettersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchLettersQuery, SearchLettersQueryVariables>(SearchLettersDocument, options);
      }
export function useSearchLettersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLettersQuery, SearchLettersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchLettersQuery, SearchLettersQueryVariables>(SearchLettersDocument, options);
        }
export function useSearchLettersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchLettersQuery, SearchLettersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchLettersQuery, SearchLettersQueryVariables>(SearchLettersDocument, options);
        }
export type SearchLettersQueryHookResult = ReturnType<typeof useSearchLettersQuery>;
export type SearchLettersLazyQueryHookResult = ReturnType<typeof useSearchLettersLazyQuery>;
export type SearchLettersSuspenseQueryHookResult = ReturnType<typeof useSearchLettersSuspenseQuery>;
export type SearchLettersQueryResult = Apollo.QueryResult<SearchLettersQuery, SearchLettersQueryVariables>;
export const SearchHaikusDocument = gql`
    query SearchHaikus($searchHaikusInput: SearchHaikusInput) {
  searchHaikus(searchHaikusInput: $searchHaikusInput) {
    ...HaikuContents
  }
}
    ${HaikuContentsFragmentDoc}`;

/**
 * __useSearchHaikusQuery__
 *
 * To run a query within a React component, call `useSearchHaikusQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchHaikusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchHaikusQuery({
 *   variables: {
 *      searchHaikusInput: // value for 'searchHaikusInput'
 *   },
 * });
 */
export function useSearchHaikusQuery(baseOptions?: Apollo.QueryHookOptions<SearchHaikusQuery, SearchHaikusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchHaikusQuery, SearchHaikusQueryVariables>(SearchHaikusDocument, options);
      }
export function useSearchHaikusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchHaikusQuery, SearchHaikusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchHaikusQuery, SearchHaikusQueryVariables>(SearchHaikusDocument, options);
        }
export function useSearchHaikusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchHaikusQuery, SearchHaikusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchHaikusQuery, SearchHaikusQueryVariables>(SearchHaikusDocument, options);
        }
export type SearchHaikusQueryHookResult = ReturnType<typeof useSearchHaikusQuery>;
export type SearchHaikusLazyQueryHookResult = ReturnType<typeof useSearchHaikusLazyQuery>;
export type SearchHaikusSuspenseQueryHookResult = ReturnType<typeof useSearchHaikusSuspenseQuery>;
export type SearchHaikusQueryResult = Apollo.QueryResult<SearchHaikusQuery, SearchHaikusQueryVariables>;
export const PoetDocument = gql`
    mutation Poet($name: String, $nameKana: String, $birthYear: String, $diedYear: String) {
  createPoet(name: $name, birthYear: $birthYear, diedYear: $diedYear) {
    name
    nameKana
    birthYear
    diedYear
  }
}
    `;
export type PoetMutationFn = Apollo.MutationFunction<PoetMutation, PoetMutationVariables>;

/**
 * __usePoetMutation__
 *
 * To run a mutation, you first call `usePoetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePoetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [poetMutation, { data, loading, error }] = usePoetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      nameKana: // value for 'nameKana'
 *      birthYear: // value for 'birthYear'
 *      diedYear: // value for 'diedYear'
 *   },
 * });
 */
export function usePoetMutation(baseOptions?: Apollo.MutationHookOptions<PoetMutation, PoetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PoetMutation, PoetMutationVariables>(PoetDocument, options);
      }
export type PoetMutationHookResult = ReturnType<typeof usePoetMutation>;
export type PoetMutationResult = Apollo.MutationResult<PoetMutation>;
export type PoetMutationOptions = Apollo.BaseMutationOptions<PoetMutation, PoetMutationVariables>;
export const CreateHaikuDocument = gql`
    mutation CreateHaiku($text: String, $description: String) {
  createHaiku(text: $text, description: $description) {
    text
    description
  }
}
    `;
export type CreateHaikuMutationFn = Apollo.MutationFunction<CreateHaikuMutation, CreateHaikuMutationVariables>;

/**
 * __useCreateHaikuMutation__
 *
 * To run a mutation, you first call `useCreateHaikuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHaikuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHaikuMutation, { data, loading, error }] = useCreateHaikuMutation({
 *   variables: {
 *      text: // value for 'text'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateHaikuMutation(baseOptions?: Apollo.MutationHookOptions<CreateHaikuMutation, CreateHaikuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHaikuMutation, CreateHaikuMutationVariables>(CreateHaikuDocument, options);
      }
export type CreateHaikuMutationHookResult = ReturnType<typeof useCreateHaikuMutation>;
export type CreateHaikuMutationResult = Apollo.MutationResult<CreateHaikuMutation>;
export type CreateHaikuMutationOptions = Apollo.BaseMutationOptions<CreateHaikuMutation, CreateHaikuMutationVariables>;
export const CreateSearchLetterDocument = gql`
    mutation CreateSearchLetter($inputLetter: InputLetter) {
  createSearchLetter(inputLetter: $inputLetter)
}
    `;
export type CreateSearchLetterMutationFn = Apollo.MutationFunction<CreateSearchLetterMutation, CreateSearchLetterMutationVariables>;

/**
 * __useCreateSearchLetterMutation__
 *
 * To run a mutation, you first call `useCreateSearchLetterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSearchLetterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSearchLetterMutation, { data, loading, error }] = useCreateSearchLetterMutation({
 *   variables: {
 *      inputLetter: // value for 'inputLetter'
 *   },
 * });
 */
export function useCreateSearchLetterMutation(baseOptions?: Apollo.MutationHookOptions<CreateSearchLetterMutation, CreateSearchLetterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSearchLetterMutation, CreateSearchLetterMutationVariables>(CreateSearchLetterDocument, options);
      }
export type CreateSearchLetterMutationHookResult = ReturnType<typeof useCreateSearchLetterMutation>;
export type CreateSearchLetterMutationResult = Apollo.MutationResult<CreateSearchLetterMutation>;
export type CreateSearchLetterMutationOptions = Apollo.BaseMutationOptions<CreateSearchLetterMutation, CreateSearchLetterMutationVariables>;
export const LikeHaikuDocument = gql`
    mutation LikeHaiku($id: Int) {
  likeHaiku(id: $id) {
    likesCount
  }
}
    `;
export type LikeHaikuMutationFn = Apollo.MutationFunction<LikeHaikuMutation, LikeHaikuMutationVariables>;

/**
 * __useLikeHaikuMutation__
 *
 * To run a mutation, you first call `useLikeHaikuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeHaikuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeHaikuMutation, { data, loading, error }] = useLikeHaikuMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeHaikuMutation(baseOptions?: Apollo.MutationHookOptions<LikeHaikuMutation, LikeHaikuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeHaikuMutation, LikeHaikuMutationVariables>(LikeHaikuDocument, options);
      }
export type LikeHaikuMutationHookResult = ReturnType<typeof useLikeHaikuMutation>;
export type LikeHaikuMutationResult = Apollo.MutationResult<LikeHaikuMutation>;
export type LikeHaikuMutationOptions = Apollo.BaseMutationOptions<LikeHaikuMutation, LikeHaikuMutationVariables>;
export const DoneHaikuDocument = gql`
    mutation DoneHaiku($id: Int) {
  doneHaiku(id: $id)
}
    `;
export type DoneHaikuMutationFn = Apollo.MutationFunction<DoneHaikuMutation, DoneHaikuMutationVariables>;

/**
 * __useDoneHaikuMutation__
 *
 * To run a mutation, you first call `useDoneHaikuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoneHaikuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doneHaikuMutation, { data, loading, error }] = useDoneHaikuMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDoneHaikuMutation(baseOptions?: Apollo.MutationHookOptions<DoneHaikuMutation, DoneHaikuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoneHaikuMutation, DoneHaikuMutationVariables>(DoneHaikuDocument, options);
      }
export type DoneHaikuMutationHookResult = ReturnType<typeof useDoneHaikuMutation>;
export type DoneHaikuMutationResult = Apollo.MutationResult<DoneHaikuMutation>;
export type DoneHaikuMutationOptions = Apollo.BaseMutationOptions<DoneHaikuMutation, DoneHaikuMutationVariables>;