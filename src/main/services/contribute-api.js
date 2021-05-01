import axios from 'axios';
import {baseAPIURL} from '../../config/index'

const searchContributionPost = async (formDra) => {
    try {
        const response = await axios.post(`${baseAPIURL}/search`,formDra);
        return (response);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const postContribution =async (formData) =>{
    try {
        const response = await axios.post(`${baseAPIURL}/contribute`,formData);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}
export {
    postContribution,
    searchContributionPost
}
