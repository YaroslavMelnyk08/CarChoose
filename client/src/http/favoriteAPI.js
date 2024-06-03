import { $authHost } from "./index";

export const addFavorite = async (favorite) => {
    const { data } = await $authHost.post('api/favorite', favorite);
    return data;
}

export const removeFavorite = async (id) => {
    const { data } = await $authHost.delete(`api/favorite/${id}`);
    return data;
}

export const fetchFavoritesByConsumer = async (ConsumerId) => {
    const { data } = await $authHost.get(`api/favorite/${ConsumerId}`);
    return data;
}