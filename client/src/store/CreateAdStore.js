import { makeAutoObservable } from 'mobx';

export default class CreateAdStore {
    constructor() {
        this._paintConditions = [];
        this._colors = [];
        this._accidents = [];
        this._drivenFrom = [];
        this._cars = [];
        this._ads = [];

        this._selectedCar = null;
        this._selectedMake = '';
        this._selectedModel = '';
        this._selectedPaintCondition = '';
        this._selectedColor = '';
        this._selectedAccident = '';
        this._selectedDrivenFrom = '';

        makeAutoObservable(this);
    }

    setPaintConditions(paintConditions) {
        this._paintConditions = paintConditions;
    }

    setSelectedPaintCondition(paintCondition) {
        this._selectedPaintCondition = paintCondition;
    }

    setColors(colors) {
        this._colors = colors;
    }

    setSelectedColor(color) {
        this._selectedColor = color;
    }

    setAccidents(accidents) {
        this._accidents = accidents;
    }

    setSelectedAccident(accident) {
        this._selectedAccident = accident;
    }

    setDrivenFrom(drivenFrom) {
        this._drivenFrom = drivenFrom;
    }

    setSelectedDrivenFrom(drivenFrom) {
        this._selectedDrivenFrom = drivenFrom;
    }

    setCars(cars) {
        this._cars = cars;
    }

    setSelectedCar(car) {
        this._selectedCar = car;
    }

    setAds(ads) {
        this._ads = ads;
    }

    setSelectedMake(make) {
        this._selectedMake = make;
    }

    setSelectedModel(model) {
        this._selectedModel = model;
    }

    get paintConditions() {
        return this._paintConditions;
    }

    get selectedPaintCondition() {
        return this._selectedPaintCondition;
    }

    get colors() {
        return this._colors;
    }

    get selectedColor() {
        return this._selectedColor;
    }

    get accidents() {
        return this._accidents;
    }

    get selectedAccident() {
        return this._selectedAccident;
    }

    get drivenFrom() {
        return this._drivenFrom;
    }

    get selectedDrivenFrom() {
        return this._selectedDrivenFrom;
    }

    get cars() {
        return this._cars;
    }

    get selectedCar() {
        return this._selectedCar;
    }

    get ads() {
        return this._ads;
    }

    get selectedMake() {
        return this._selectedMake;
    }

    get selectedModel() {
        return this._selectedModel;
    }

    get models() {
        return this._cars.filter(car => car.make === this._selectedMake);
    }
}