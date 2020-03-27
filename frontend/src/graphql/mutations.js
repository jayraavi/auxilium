/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
export const createTutor = /* GraphQL */ `
  mutation CreateTutor(
    $input: CreateTutorInput!
    $condition: ModelTutorConditionInput
  ) {
    createTutor(input: $input, condition: $condition) {
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
export const updateTutor = /* GraphQL */ `
  mutation UpdateTutor(
    $input: UpdateTutorInput!
    $condition: ModelTutorConditionInput
  ) {
    updateTutor(input: $input, condition: $condition) {
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
export const deleteTutor = /* GraphQL */ `
  mutation DeleteTutor(
    $input: DeleteTutorInput!
    $condition: ModelTutorConditionInput
  ) {
    deleteTutor(input: $input, condition: $condition) {
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
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
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
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
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
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
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
