//track the searches made by a user

import { Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
    Query.equal("searchTerm", query),
  ]);
  try {
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(DATABASE_ID, TABLE_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(),{
          searchTerm: query,
          count: 1,
          movie_id: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }


  console.log(result);

  //if a document is found increment the searchCount field
  //if no document is found create a new document in Appwrite database -> 1
};
