const conf={
    appwriteurl:String(import.meta.env.VITE_APPWRITE_URL),
    projectid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionid:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    storageid:String(import.meta.env.VITE_APPWRITE_STORAGE_ID),

}
export default conf