/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      name
      email
      cell
      sessions {
        items {
          id
          studentID
          tutorID
        }
        nextToken
      }
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        cell
        sessions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getTutor = /* GraphQL */ `
  query GetTutor($id: ID!) {
    getTutor(id: $id) {
      id
      name
      email
      cell
      classes {
        items {
          id
          dept
          num
          tutorID
        }
        nextToken
      }
      sessions {
        items {
          id
          studentID
          tutorID
        }
        nextToken
      }
    }
  }
`;
export const listTutors = /* GraphQL */ `
  query ListTutors(
    $filter: ModelTutorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTutors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        cell
        classes {
          nextToken
        }
        sessions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      studentID
      tutorID
      class {
        id
        dept
        num
        tutorID
        tutor {
          id
          name
          email
          cell
        }
      }
      student {
        id
        name
        email
        cell
        sessions {
          nextToken
        }
      }
      tutor {
        id
        name
        email
        cell
        classes {
          nextToken
        }
        sessions {
          nextToken
        }
      }
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        studentID
        tutorID
        class {
          id
          dept
          num
          tutorID
        }
        student {
          id
          name
          email
          cell
        }
        tutor {
          id
          name
          email
          cell
        }
      }
      nextToken
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      dept
      num
      tutorID
      tutor {
        id
        name
        email
        cell
        classes {
          nextToken
        }
        sessions {
          nextToken
        }
      }
    }
  }
`;
export const listClasss = /* GraphQL */ `
  query ListClasss(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dept
        num
        tutorID
        tutor {
          id
          name
          email
          cell
        }
      }
      nextToken
    }
  }
`;
