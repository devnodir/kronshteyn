import type { RcFile } from "antd/es/upload/interface";

export const parseSeporate = (value: string, seporate: string = ",") => {
    return value?.toString().replaceAll(seporate, "");
};

export const toThousand = (value: string, seporate: string = ",") => {
    if (value)
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seporate);
    return value;
};

export const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const imageURL = (val: string) => {
    return `${import.meta.env.VITE_APP_BASE_URL}/${val}`;
};

export const convertImage = (obj: any) => {
    return {
        uid: obj._id,
        name: obj.fileName,
        url: imageURL(obj.filePath),
        isUploaded: true,
    };
};

export const parseOptions = (options: any[]) => {
    return options.map((item) => {
        return {
            ...item,
            titleRu: item.ru?.title,
            titleUz: item.uz?.title,
        };
    });
};

export const mapTableData = (arr: any[]) => {
    return arr.map((el, index) => {
        return {
            ...el,
            no: index + 1,
            key: el._id,
        };
    });
};
