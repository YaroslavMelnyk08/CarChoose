import { makeAutoObservable } from 'mobx';
import { addFavorite, removeFavorite, fetchFavoritesByConsumer } from "../http/favoriteAPI";

export default class AdStore {
    constructor() {
        this._paintConditions = []
        this._colors = []
        this._accidents = []
        this._drivenFrom = []
        this._cars = []
        this._ads = []

        this._selectedCar = null;
        this._selectedMake = '';
        this._selectedModel = '';
        this._selectedPaintCondition = '';
        this._selectedColor = '';
        this._selectedAccident = '';
        this._selectedDrivenFrom = '';

        this._page = 1
        this._totalCount = 0
        this._limit = 10

        this._favorites = [];

        makeAutoObservable(this)
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setPaintConditions(paintConditions) {
        this._paintConditions = paintConditions
    }

    setSelectedPaintCondition(paintCondition) {
        this.setPage(1)
        this._selectedPaintCondition = paintCondition
    }

    setColors(colors) {
        this._colors = colors
    }

    setSelectedColor(color) {
        this.setPage(1)
        this._selectedColor = color
    }

    setAccidents(accidents) {
        this._accidents = accidents
    }

    setSelectedAccident(accident) {
        this.setPage(1)
        this._selectedAccident = accident
    }

    setDrivenFrom(drivenFrom) {
        this._drivenFrom = drivenFrom
    }

    setSelectedDrivenFrom(drivenFrom) {
        this.setPage(1)
        this._selectedDrivenFrom = drivenFrom
    }

    setCars(cars) {
        this._cars = cars
    }

    setAds(ads) {
        this._ads = ads
    }

    setSelectedMake(make) {
        this._selectedMake = make;
    }

    setSelectedModel(model) {
        this._selectedModel = model;
    }

    setSelectedCar(car) {
        this.setPage(1)
        this._selectedCar = car;
    }

    setFavorites(favorites) {
        this._favorites = favorites;
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }

    get paintConditions() {
        return this._paintConditions
    }

    get selectedPaintCondition() {
        return this._selectedPaintCondition
    }

    get colors() {
        return this._colors
    }

    get selectedColor() {
        return this._selectedColor
    }

    get accidents() {
        return this._accidents
    }

    get selectedAccident() {
        return this._selectedAccident
    }

    get drivenFrom() {
        return this._drivenFrom
    }

    get selectedDrivenFrom() {
        return this._selectedDrivenFrom
    }

    get cars() {
        return this._cars
    }

    get ads() {
        return this._ads
    }

    get selectedMake() {
        return this._selectedMake;
    }

    get selectedModel() {
        return this._selectedModel;
    }

    get selectedCar() {
        return this._selectedCar;
    }

    get models() {
        return this._cars.filter(car => car.make === this._selectedMake);
    }

    get favorites() {
        return this._favorites;
    }

    async addFavorite(ad) {
        try {
            const favorite = await addFavorite(ad);
            this._favorites.push(favorite);
        } catch (e) {
            console.error("Failed to add favorite:", e);
        }
    }

    async removeFavorite(id) {
        try {
            await removeFavorite(id);
            this._favorites = this._favorites.filter(fav => fav.id !== id);
        } catch (e) {
            console.error("Failed to remove favorite:", e);
        }
    }

    async fetchFavoritesByConsumer(consumerId) {
        try {
            const favorites = await fetchFavoritesByConsumer(consumerId);
            this.setFavorites(favorites);
        } catch (e) {
            console.error("Failed to fetch favorites:", e);
        }
    }
}