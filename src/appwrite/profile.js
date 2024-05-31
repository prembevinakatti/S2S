import conf from "../configuration/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
const{appwriteurl,projectid,databaseid,storageid,collectionid}=conf
export class profileservices{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(appwriteurl)
        .setProject(projectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createprofile({UserId, name, location, coordinates, phoneNumber, imageId,slug}){
        try {
            return await this.databases.createDocument(
               databaseid,
               collectionid,
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
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updateprofile(slug,{UserId, name, location, coordinates, phoneNumber, imageId}){
        try {
            return await this.databases.updateDocument(
               databaseid,
               collectionid,
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
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

   
    

    async getuser(slug){
        try {
            return await this.databases.getDocument(
                databaseid,
               collectionid,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }




    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const profileservices = new Service()
export default profileservices