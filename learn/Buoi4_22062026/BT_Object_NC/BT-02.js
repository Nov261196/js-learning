const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 1,
      profile: {
        firstName: "Nguyen",
        lastName: "An",
        contacts: {
          email: "an@example.com",
          phone: "0909000000"
        }
      }
    },
    token: "abc123"
  }
};

const { 
  status, 
  data: { 
    user: { 
      profile: { firstName, contacts: { email } = {} } 
    }, 
    token 
  } = {} 
} = apiResponse;

console.log(`Status: ${status}, Token: ${token}, Name: ${firstName}, Email: ${email}`);