import conf from "../configuration/config";
import { Client, ID, Databases, Storage } from "appwrite";

class ProfileServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteurl).setProject(conf.projectid);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createProfile({
    UserId,
    name,
    location,
    coordinates,
    phoneNumber,
    imageId,
    slug,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid,
        ID.unique(),
        {
          name,
          location,
          phoneNumber,
          imageId,
          UserId,
          coordinates,
          slug,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile :: error", error);
      throw error;
    }
  }

  async updateProfile(
    slug,
    { UserId, name, location, coordinates, phoneNumber, imageId }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          name,
          location,
          phoneNumber,
          imageId,
          UserId,
          coordinates,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }

  async getUser(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getUser :: error", error);
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

  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        conf.storageid,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }
}

const profileService = new ProfileServices();
export default profileService;
