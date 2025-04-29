import { fetchUtils } from 'react-admin';
import { SERVER_URL } from 'consts/consts';
import { stringify } from 'query-string';

const httpClient = (url, options = {}) => {
    const initData = localStorage.getItem('username');
    options.user = {
        authenticated: true,
        token: `tma ${initData}`
    };
    return fetchUtils.fetchJson(url, options);
};



const dataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        };

        const url = `${SERVER_URL}/${resource}?${stringify(query)}`;
        const { json, headers } = await httpClient(url, { signal: params.signal });

        if (resource === 'products') {
            const data = json.map((product) => ({
                ...product,
                images: product.images.map((image) => ({
                    ...image,
                    src: `${SERVER_URL}${image.src}`
                }))
            }));

            return {
                data: data,
                total: parseInt(headers.get('content-range')?.split('/').pop(), 10),
            }
        }

        return {
            data: json,
            total: parseInt(headers.get('content-range')?.split('/').pop(), 10),
        };
    },

    getOne: async (resource, params) => {
        const url = `${SERVER_URL}/${resource}/${params.id}`;
        const { json } = await httpClient(url, { signal: params.signal });

        if (!json || Object.keys(json).length === 0) {
            console.error('Empty response for getOne:', json);
        }

        const data = {
            ...json[0],
            images: json[0]?.images.map((image) => ({
                ...image,
                src: `${SERVER_URL}${image.src}`
            }))
        };

        return { data: data };
    },

    create: async (resource, params) => {
        const formData = new FormData();

        Object.keys(params.data).forEach((key) => {
            if (key !== 'images') {
                formData.append(key, params.data[key]);
            }
        });

        if (params.data.images && params.data.images.length > 0) {
            params.data.images
                .forEach((file) => {
                    formData.append('images', file.rawFile);
                });
        }
    
        const url = `${SERVER_URL}/${resource}`;

        const { json } = await httpClient(url, {
            method: 'POST',
            body: formData,
        });
    
        return { data: json };
    },

    update: async (resource, params) => {
        if (resource === 'products') {
            const formData = new FormData();

            Object.keys(params.data).forEach((key) => {
                if (key !== 'images') {
                    formData.append(key, params.data[key]);
                }
            });

            // Фильтруем новые изображения и добавляем их в FormData
            if (params.data.images && params.data.images.length > 0) {
                params.data.images
                    .filter((image) => image.rawFile) // Берём только новые изображения
                    .forEach((file) => {
                        formData.append('images', file.rawFile);
                    });
            }
        
            const url = `${SERVER_URL}/${resource}/${params.id}`;

            const { json } = await httpClient(url, {
                method: 'PUT',
                body: formData,
            });
        
            return { data: json };
        }
    },

    delete: async (resource, params) => {
        const url = `${SERVER_URL}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: json };
    },

    deleteMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        const url = `${SERVER_URL}/${resource}?${stringify(query)}`;
        await httpClient(url, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        });
        return { data: params.ids };
    },
};

export default dataProvider;