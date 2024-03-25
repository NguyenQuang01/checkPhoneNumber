import apiServices from '@/app/services/axios'

//Projects
export const funDuplicatePhoneNumbers = async (param: any,code: string) => {
    if (!(param instanceof File)) {
      throw new Error('Invalid input. Expected a File object.');
    }
  const formData = new FormData();
  formData.append('excelFile', param);
  try {
    const response = await apiServices.postFile(`/checkPhone?code=${code}`,formData)
    return response
  } catch (error) {
    return { status: 500 }
  }
}

export const funCheckOnlyPhoneNumber = async (param:any) => {
 
  try {
    const response = await apiServices.post(`/checkOnlyPhone`,param)
    return response
  } catch  {
    return { status: 500 }
  }
}