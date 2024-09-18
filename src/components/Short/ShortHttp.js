import { getToken } from "../../helper/AsyncStorageHelper";
import AxiosInstance from "../../http/AxiosInstance";
import axios from 'axios';

export const createNew = async (creator,title, text, categories, images,type,music) => {
    try {
        const url = '/v1/short/shorts';
        const body = {
            creator:creator,
            title:title,
            text:text,
            categories:categories,
            images: images,
            type: type,
            music: music
        }
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getTenShorts = async (limit, page) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/short/tenshorts?limit=${limit}&page=${page}`;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('Error fetching ten shorts:', error);
        throw error;
    }
};

// Tạo mới một Short
export const createShort = async (shortData) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/shorts';
        const response = await axiosInstance.post(url, shortData);
        return response.data;
    } catch (error) {
        console.log('Error creating short:', error);
        throw error;
    }
};

// Xóa (ẩn) một Short
export const deleteShort = async (shortId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/shorts/${shortId}`;
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        console.log('Error deleting short:', error);
        throw error;
    }
};

// Lấy tất cả Shorts
export const getAllShorts = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/shorts';
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.log('Error fetching all shorts:', error);
        throw error;
    }
};

// Cập nhật số lần đọc của một Short
export const updateReadCount = async (shortId) => {
    const body = { shortId }
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/short/shortsread';
        const response = await axiosInstance.put(url, body);
        return response;
    } catch (error) {
        console.log('Error updating read count:', error);
        throw error;
    }
};

// Cập nhật danh sách thích (likes) của một Short
export const updateLikes = async (shortId, userId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/short/shorts/likes';
        const response = await axiosInstance.put(url, { shortId, userId });
        return response;
    } catch (error) {
        console.log('Error updating likes:', error);
        throw error;
    }
};
// Cập nhật danh sách thích (likes) của một Short
export const updateDeleteLikes = async (shortId, userId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/short/shorts/deletelikes';
        const response = await axiosInstance.put(url, { shortId, userId });
        return response;
    } catch (error) {
        console.log('Error updating likes:', error);
        throw error;
    }
};
// Cập nhật danh sách không thích (unlikes) của một Short
export const updateUnLikes = async (shortId, userId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/short/shorts/unlikes';
        const response = await axiosInstance.put(url, { shortId, userId });
        return response;
    } catch (error) {
        console.log('Error updating unlikes:', error);
        throw error;
    }
};

// Lấy Shorts được tạo hôm nay
export const getShortsCreatedToday = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/shorts/today';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('Error fetching shorts created today:', error);
        throw error;
    }
};
