import {  toast } from 'react-toastify';
export const toastHelper = (message:string, type:toastEnum) => {
    if(type == toastEnum.SUCCESS) {
        toast.success(message);
    } else if(type == toastEnum.ERROR) {
        toast.error(message);
    }
}

export enum toastEnum {
    SUCCESS = "success",
    ERROR = "error"
}