import conf from "../configuration/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class ProfileServices {
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.projectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createProfile({ UserId, name, location, coordinates, phoneNumber, imageId, slug }){
        try {
            return await this.databases.createDocument(
                conf.databaseid,
                conf.collectionid,
                slug,
                {
                    name,
                    location,
                    phoneNumber,
                    imageId,
                    UserId,
                    coordinates
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createProfile :: error", error);
        }
    }

    async updateProfile(slug, { UserId, name, location, coordinates, phoneNumber, imageId }){
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
                    coordinates
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateProfile :: error", error);
        }
    }

    async getUser(slug){
        try {
            return await this.databases.getDocument(
                conf.databaseid,
                conf.collectionid,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getUser :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.storageid,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.storageid,
            fileId
        );
    }
    uploadfile(file){
        return this.bucket.createFile(
            conf.storageid,
            file
        )
    }
}

const profileService = new ProfileServices();
export default profileService;
