import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async(key,value) =>{
    try{
        await AsyncStorage.setItem(key,value)
    }catch(e){
        console.log("Error Storing Value",error);
    }
}

export const getItem = async(key) =>{
    try{
        return await AsyncStorage.getItem(key)
    }catch(e){
        console.log("Error Retrieving Value",error);
    }
}

export const removeItem = async(key) =>{
    try{
        await AsyncStorage.removeItem(key)
    }catch(e){
        console.log("Error Deleting Value",error);
    }
}