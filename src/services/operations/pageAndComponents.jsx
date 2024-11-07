import React from 'react'
import { toast } from 'react-hot-toast';
import { catalogData } from '../../services/apis';
import { apiConnector } from '../apiconnector';

const {
    GET_CATALOG_PAGE_DATA_API,
 } = catalogData;

export const getCatalogPageData = async(categoryId) => {
  
    let result = [];
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector('POST', GET_CATALOG_PAGE_DATA_API, { categoryId }
        );

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        toast.success(response.data.message);
        result = response.data;
    } catch (err) { 

        console.log("Error : ", err);
        toast.error(err.response.data.message);
        result = err.response.data;
    }

    toast.dismiss(toastId);
    return result;

}
