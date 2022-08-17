import axiosInstance from './axios'
import { baseUrl } from './api'

export const getQuestions = async () => {
    try {
        const response = await axiosInstance({
            method: 'get',
            url: baseUrl + '/questions'
        })
        return response.data.questions
    } catch (error) {
        console.log('error')
    }
}
