import conf from "../configuration/config";
import { Client, ID, Databases, Storage } from "appwrite";

class uploadServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteurl).setProject(conf.projectid);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async uploadFile({
    UserId,
    name,
    location,
    coordinates,
    modofdev,
    imageId,
    fooddetails,
    slug,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid2,
        slug,
        {
          UserId,
          name,
          location,
          coordinates,
          modofdev,
          imageId,
          fooddetails,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  async updateFile(slug, {
    UserId,
    name,
    location,
    coordinates,
    modofdev,
    imageId,
    fooddetails,
  }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid2,
        slug,
        {
          UserId,
          name,
          location,
          coordinates,
          modofdev,
          imageId,
          fooddetails,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateFile :: error", error);
      throw error;
    }
  }

  async getFood(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid2,
        slug
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
}

const profileService = new uploadServices();
export default profileService;
