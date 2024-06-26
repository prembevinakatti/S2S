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
    imgId,
    slug,
    ngoNumber,

    nofeed,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          name,
          location,
          phoneNumber,
          imgId,
          UserId,
          coordinates,
          ngoNumber,
          nofeed,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile :: error", error);
      throw error;
    }
  }

  async updateProfile(
    slug,
    { UserId, name, location, coordinates, phoneNumber, imgId }
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
          imgId,
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
      return await this.storage.createFile(conf.storageid, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  async updatependingSection(slug, pendingSection) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        pendingSection
      );
    } catch (error) {
      console.log("Appwrite service :: updatePendingSection :: error", error);
      throw error;
    }
  }

  async updateapprovedSection(slug, approvedSection) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        approvedSection
      );
    } catch (error) {
      console.log("Appwrite service :: updateApprovedSection :: error", error);
      throw error;
    }
  }

  async updatedeliveredSection(slug, deliveredSection) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        deliveredSection
      );
    } catch (error) {
      console.log("Appwrite service :: updateDeliveredSection :: error", error);
      throw error;
    }
  }
  async updatefeedback(slug, feedback) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        { feedback }
      );
    } catch (error) {
      console.log("Appwrite service :: updateDeliveredSection :: error", error);
      throw error;
    }
  }
  async updatecharts(slug, charts) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        charts
      );
    } catch (error) {
      console.log("Appwrite service :: updateDeliveredSection :: error", error);
      throw error;
    }
  }
}

const profileService = new ProfileServices();
export default profileService;
