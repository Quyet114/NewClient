import { getToken } from "../../helper/AsyncStorageHelper";
import AxiosInstance from "../../http/AxiosInstance";
import axios from 'axios';
export const getNewsToday = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/post/today';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getNewsMostRead = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/post/most-read';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getNewsMostLike = async () => {
    try {
        const token = await getToken('token');
        const axiosInstance = AxiosInstance();
        const url = '/v1/post/most-liked';
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getNewsByCategory = async (categoryId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/post/category/${categoryId}`;
        const response = await axiosInstance.get(url);
        if (response.status === 1) {
            return response.posts;
        } else {
            console.error('Failed to fetch posts:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Ném lỗi để xử lý sau
    }
};
export const getTodayNewsByCategory = async (categoryId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/post/categorytoday/${categoryId}`;
        const response = await axiosInstance.get(url);
        if (response.status === 1) {
            return response.posts;
        } else {
            console.error('Failed to fetch posts:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Ném lỗi để xử lý sau
    }
};
export const getTenReadNewsByCategory = async (categoryId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/post/tenreadcategory/${categoryId}`;
        const response = await axiosInstance.get(url);
        if (response.status === 1) {
            return response.posts;
        } else {
            console.error('Failed to fetch posts:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Ném lỗi để xử lý sau
    }
};
export const updateRead = async (postId, userId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/post/updateReadCount';

        // Tạo đối tượng body với postId và tùy chọn userId
        const body = { postId, userId };
        // Gửi yêu cầu POST với body
        const response = await axiosInstance.post(url, body);

        // Kiểm tra status và xử lý phản hồi
        if (response.status === 1) {
            console.log('read ++');

            return response; // Trả về dữ liệu khi thành công

        } else {
            console.error('Failed to update read count:', response);
            return { status: response.status, message: response };
        }
    } catch (error) {
        console.error('Error updating read count:', error);
        throw error; // Ném lỗi để xử lý sau
    }
};
export const updateReadWithowUser = async (postId) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/v1/post/updateReadCount';

        // Tạo đối tượng body với postId và tùy chọn userId
        const body = { postId };
        // Gửi yêu cầu POST với body
        const response = await axiosInstance.post(url, body);

        // Kiểm tra status và xử lý phản hồi
        if (response.status === 1) {
            console.log('read none User ++');

            return response; // Trả về dữ liệu khi thành công

        } else {
            console.error('Failed to update read count:', response);
            return { status: response.status, message: response };
        }
    } catch (error) {
        console.error('Error updating read count:', error);
        throw error; // Ném lỗi để xử lý sau
    }
};
export const getMylike = async (userId) => {
    const token = await getToken('token');

    if (!userId) {
        console.error("User ID is null or undefined");
        return [];
    }
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/post/likes/${userId}`;
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${token}` // Đảm bảo token đã được định nghĩa
            }
        });
        if (response.status === 1) {
            return response.user.likeHistory;
        } else {
            console.error('Failed to fetch posts:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch posts:', error.message);
        return [];
    }
};

export const getMyRead = async (userId) => {
    const token = await getToken('token');
    if (!userId) {
        console.error("User ID is null or undefined");
        return [];
    }
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/post/reads/${userId}`;
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 1) {
            return response.user.readHistory;
        } else {
            console.error('Failed to fetch posts:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch posts:', error.message);
        return [];
    }
};
export const getNewDetail = async (id) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/v1/dishes/${id}`;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const upLoadImage = async (form) => {
    const token = await getToken('token');
    try {
        const axiosInstance = axios.create({
            baseURL: 'http://192.168.137.1:8080/',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        const url = '/v1/image/upload-medias';
        const result = await axiosInstance.post(url, form);
        return result.data;
    } catch (error) {
        console.error('Error uploading image:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const createNew = async (creator,title, text, categories, imagePath) => {
    const token = await getToken('token')
    try {
        const url = '/v1/post/posts';
        const body = {
            creator:creator,
            title:title,
            text:text,
            categories:categories,
            images: imagePath
        }
        return await AxiosInstance().post(url, body, {
            headers: {
                Authorization: `Bearer ${token}` // Đảm bảo token đã được định nghĩa
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const searchNews = async (keyword) => {
    try {
        const url = `/v1/post/find/search?keyword=${keyword}`;
        const result = await AxiosInstance().get(url);
        return result;
    } catch (error) {
        console.log('>>>>>>>> search news', error);
        throw error;
    }
}
export const deleteNew = async (_id) => {
    try {
        const url = `/articles/${_id}/delete`;
        return await AxiosInstance().delete(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getCmt = async (id) =>{
    try {
        const url=`/v1/cmt/${id}/comments`;
        const result =  await AxiosInstance().get(url);
        return(result)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getShortCmt = async (id) =>{
    try {
        const url=`/v1/cmt/${id}/shortcomments`;
        const result =  await AxiosInstance().get(url);
        return(result)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const sendComment = async (commentData) => {
    try {
        const url = '/v1/cmt/comments';
        const result = await AxiosInstance().post(url, commentData);
        return result;
    } catch (error) {
        console.error('Error sending comment:', error);
        throw error;
    }
};
export const getPostsByUser = async (userId) =>{
    try {
        const url=`/v1/post/getposybyuser/${userId}`;
        const result =  await AxiosInstance().get(url);
        return(result)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getPostsTodayByUser = async (userId) =>{
    try {
        const url=`/v1/post/getpostbyusertoday/${userId}`;
        const result =  await AxiosInstance().get(url);
        return(result)
    } catch (error) {
        console.log(error);
        throw error;
    }
}