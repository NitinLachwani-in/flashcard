# Flashcards with GraphQL

We are trying to create a flashcards app using MongoDB and GraphQL.
The features will have:
- Create a Flashcard (ID and FlashInfo)
- Update a FlashCard
- View all Flashcards
- Delete a Flashcard using ID

Requirements

Node.js
MongoDB

Installation Steps
Clone repo
Run npm install
Make sure Mongo is running
Run npm start
Go to http://localhost:4000/graphql

Creating a Flashcard:

mutation {
  createFlashcard(input: {
    flashinfo: "Device clouds are distributed devices all across the world"
  })
  {
    _id
    flashinfo
  }
}

![image](https://user-images.githubusercontent.com/89160846/130115329-2dca1cc3-da9d-4b28-9d08-309e8c5304e7.png)


Updating a Flashcard:
mutation {
  updateFlashcard(_id: "611e8c97a77a07de69603e9c", input: {
    flashinfo:"Lets talk about Mobile Device Clouds"
  })
  {
    _id
    flashinfo
  }
}

![image](https://user-images.githubusercontent.com/89160846/130115565-68d0d283-8228-4f2e-af25-5961b88b5e0a.png)


Viewing All Flashcards:

query Query {
  allFlashcards {
    _id
    flashinfo
    
  }
}

![image](https://user-images.githubusercontent.com/89160846/130115713-c8317d78-6619-432d-9609-1c522ebe0ba0.png)


Deleting a Flashcard based on ID:

mutation {
  deleteFlashcard(_id: "611e8cb3a77a07de69603e9e")
  {
    _id
  flashinfo
  }
}

![image](https://user-images.githubusercontent.com/89160846/130115827-24e0c532-b035-4599-87e7-8cc9c2672abb.png)

Viewing All Flashcards (after delete):

query Query {
  allFlashcards {
    _id
    flashinfo
    
  }
}

![image](https://user-images.githubusercontent.com/89160846/130115922-d93f8a37-af87-4eba-be1f-8193bc83eecd.png)

