import { $authHost, $host } from "./index";

export const createCar = async (car) => {
    const {data} = await $authHost.post('api/car', car)
    return data
}

export const fetchCars = async () => {
    const {data} = await $host.get('api/car')
    return data
}

export const fetchPaintConditions = async () => {
    const {data} = await $host.get('api/paintCondition')
    return data
}

export const fetchColors = async () => {
    const {data} = await $host.get('api/color')
    return data
}

export const fetchAccidents = async () => {
    const {data} = await $host.get('api/accident')
    return data
}

export const fetchDrivenFrom = async () => {
    const {data} = await $host.get('api/drivenFrom')
    return data
}

export const createNewAd = async (ad) => {
    const {data} = await $authHost.post('api/ad', ad)
    return data
}

export const fetchAds = async (CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId, page, limit = 5) => {
    const {data} = await $host.get('api/ad', {params: {
        CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId, page, limit
    }})
    return data
}

export const fetchOneAd = async (id) => {
    const {data} = await $host.get('api/ad/' + id)
    return data
}