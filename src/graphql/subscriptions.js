/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent {
    onCreateStudent {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
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
export const onCreateTutor = /* GraphQL */ `
  subscription OnCreateTutor {
    onCreateTutor {
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
export const onUpdateTutor = /* GraphQL */ `
  subscription OnUpdateTutor {
    onUpdateTutor {
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
export const onDeleteTutor = /* GraphQL */ `
  subscription OnDeleteTutor {
    onDeleteTutor {
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
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass {
    onCreateClass {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass {
    onUpdateClass {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass {
    onDeleteClass {
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
