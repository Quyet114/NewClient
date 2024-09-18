import { getToken } from "../../helper/AsyncStorageHelper";
import AxiosInstance from "../../http/AxiosInstance";

export const sendMail = async (username) => {
    try {
        const url = '/v1/password/reset-password';
        const body = {
            username: username
        }
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const url = '/v1/auth/login';
        const body = {
            email: email,
            password: password
        }
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const logout = async () => {
    try {
        const url = '/auth/logout';
        return await AxiosInstance().get(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const register = async (username, email, password) => {
    try {
        const url = '/v1/auth/register';
        const body = {
            name: username,
            email: email,
            password: password
        };
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updateUser = async (name, avatar) => {
    try {
        const url = '/v1/user/update';
        const body = {
            name,
            avatar,
            about,
        }
        const response =  await AxiosInstance().put(url, body);
        if(response.status ===1){
            return response;
        }else{
            console.log('error: ', response);
            
        }
    } catch (error) {
        throw error;
        console.log('error: ', error);
        
    }
}
export const upLoadAvatar = async (form) => {
    try {
        const axiosInstance = AxiosInstance('mutipart/form-data');
        const url = '/v1/media/upload';
        const result = await axiosInstance.post(url, form);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const changePassword = async (password) => {
    try {
        const url = '/v1/password/reset-password';
        const body = {
            password: password
        };
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getUserById = async (id) => {
    try {
        const url = `/v1/user/one?userId=${id}`;
        const result = await AxiosInstance().get(url);
        if(result){
            return result;
        }
    } catch (error) {
        console.log('getUserById',error);
        throw error;
    }
}
export const getFollowersByStatus = async (userId, status) => {
    const token = await getToken('token');
    try {
        const url = `/v1/user/followers/${userId}?status=${status}`;
        const response = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 1) {
            //console.log('res:', response.data);
            
            return response.data; // Trả về danh sách follower
        } else {
            console.error('Failed to fetch followers:', response);
            return [];
        }
    } catch (error) {
        console.error('Error fetching followers:', error);
        return [];
    }
};
export const updateLike = async (postId, userId)=>{
    const body = {
        postId: postId,
        userId:userId
    };
    try {
        const url = '/v1/post/updatelike';
        const response = await AxiosInstance().post(url,body);
        if (response.status === 1) {
            return response; // Trả về danh sách follower
        } else {
            console.error('Failed to update like:', response);
            return [];
        }
    } catch (error) {
        console.error('Failed to update like:', error);
        return [];
    }
};
export const updateunLike = async (postId, userId)=>{
    const body = {
        postId: postId,
        userId:userId
    };
    try {
        const url = '/v1/post/updateunlike';
        const response = await AxiosInstance().post(url,body);
        if (response.status === 1) {
            return response; // Trả về danh sách follower
        } else {
            console.error('Failed to update unlike: ', response);
            return [];
        }
    } catch (error) {
        console.error('Failed to update unlike: ', error);
        return [];
    }
};
export const followPage = async (followeeId)=>{
    try {
        const url = '/v1/user/follow-authenticated';
        const response = await AxiosInstance().post(url, {followeeId})
        if (response.status === 1) {
            return response; // Trả về danh sách follower
        } else {
            console.error('Failed to update follow: ', response);
            return [];
        }
    } catch (error) {
        console.error('Failed to update follow: ', error);
        return [];
    }
};
export const unFollowPage = async (followeeId)=>{
    try {
        const url = '/v1/user/unfollow-authenticated';
        const response = await AxiosInstance().post(url, {followeeId})
        if (response.status === 1) {
            return response; // Trả về danh sách follower
        } else {
            console.error('Failed to update unFollow: ', response);
            return [];
        }
        
    } catch (error) {
        console.error('Failed to update unFollow: ', error);
        return [];
    }
};
export const getPostAndShort = async (id)=>{
    try {
        const url = `/v1/user/getpostnshort/${id}`;
        const response = await AxiosInstance().get(url)
        if (response.status === 1) {
            return response; // Trả về danh sách follower
        } else {
            console.error('Failed to get ps and ss: ', response);
            return [];
        }
        
    } catch (error) {
        console.error('Failed to get ps and ss: ', error);
        return [];
    }
}