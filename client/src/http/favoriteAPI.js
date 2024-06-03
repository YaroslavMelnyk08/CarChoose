import { $host } from "./index";

export const addFavorite = async (favorite) => {
    const { data } = await $host.post('api/favorite', favorite);
    return data;
}

export const removeFavorite = async (id) => {
    const { data } = await $host.delete(`api/favorite/${id}`);
    return data;
}

export const fetchFavoritesByConsumer = async (ConsumerId) => {
    const { data } = await $host.get(`api/favorite/${ConsumerId}`);
    return data;
}