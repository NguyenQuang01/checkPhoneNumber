import apiServices from "@/app/services/axiosCRM";

//Projects
export const funLogin = async (param: any) => {
    const payload = {
        grant_type: "password",
        client_id: "lms_jaxtina#$@",
        client_secret: "lms_jaxtina#!@$",
        username: param.username,
        password: param.password,
        platform: "base",
    };
    try {
        const response = await apiServices.post(`oauth2/token`, payload);
        return response;
    } catch (error) {
        return { status: 500 };
    }
};
