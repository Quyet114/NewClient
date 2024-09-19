
import AxiosInstance from "../../http/AxiosInstance";
import axios from 'axios';
import { getToken } from "../../helper/AsyncStorageHelper";
export const createNewMusic = async ( name, type, time, link,creator) => {
    try {
        const url = '/v1/music/new';
        const body = {
            creator,
            type : type || 0,
            name:name,
            time: time || 0,
            url: link
        }
       const response = await AxiosInstance().post(url, body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllMusic = async () => {
    try {
        const url = '/v1/music/all';
        const response = await AxiosInstance().get(url);
        return response;
    } catch (error) {
        console.log('Error fetching ten shorts:', error);
        throw error;
    }
};

export const searchMusic = async (keyword) => {
    try {
        const url = `/v1/music/searchmusic/search?keyword=${keyword}`;
        const result = await AxiosInstance().get(url);
        return result;
    } catch (error) {
        console.log('>>>>>>>> search news', error);
        throw error;
    }
}

// Cập nhật số lần đọc của một Short
export const updateUsed = async (id) => {

    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/music/shortsread';
        const response = await axiosInstance.put(url, id);
        return response;
    } catch (error) {
        console.log('Error updating read count:', error);
        throw error;
    }
};
export const upLoadMusic = async (form) => {
    const token = await getToken('token');
    try {
        const axiosInstance = axios.create({
            baseURL: 'https://api-network-emdi.onrender.com/',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        const url = '/v1/image/upload-mp3';
        const result = await axiosInstance.post(url, form);
        return result.data;
    } catch (error) {
        console.error('Error uploading music:', error.response ? error.response.data : error.message);
        throw error;
    }
};

