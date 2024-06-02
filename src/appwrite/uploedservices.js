import conf from "../configuration/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class UploadServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteurl).setProject(conf.projectid);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async uploadFile({
    userId,
    name,
    location,
    coordinates,
    modofdev,
    imageId,
    fooddetails,
    slug,
    nofeed,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid2,
        slug,
        {
          userId,
          name,
          location,
          coordinates,
          modofdev,
          imageId,
          fooddetails,
          nofeed,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  async updateFile(slug, {
    userId,
    name,
    location,
    coordinates,
    modofdev,
    imageId,
    fooddetails,
    nofeed,
  }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid2,
        slug,
        {
          userId,
          name,
          location,
          coordinates,
          modofdev,
          imageId,
          fooddetails,
          nofeed,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateFile :: error", error);
      throw error;
    }
  }

  async getFood(queries) {
    try {
      return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid2,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getFood :: error", error);
      throw error;
    }
  }

  async getSingleFood(food) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid2,
        food
      );
    } catch (error) {
      console.log("Appwrite service :: getFood :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.storageid, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.storageid, fileId);
  }

  async uploadFileToStorage(file) {
    try {
      return await this.storage.createFile(
        conf.storageid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFileToStorage :: error", error);
      throw error;
    }
  }

  async updaterequests(documentId, requests) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid2,
        documentId,
        requests
      );
    } catch (error) {
      console.log("error in updaterequests", error);
      throw error;
    }
  }
}

const uploadServices = new UploadServices();
export default uploadServices;
