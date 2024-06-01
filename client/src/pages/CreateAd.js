import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchAccidents, fetchCars, fetchColors, fetchDrivenFrom, fetchPaintConditions, createNewAd } from '../http/adAPI';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const CreateAd = observer(() => {
    const { newAd, user } = useContext(Context);
    const [description, setDescription] = useState('');
    const [yearOfManufacture, setYearOfManufacture] = useState('');
    const [mileage, setMileage] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]);
    const [mainPhotoIndex, setMainPhotoIndex] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCars().then(data => newAd.setCars(data));
        fetchPaintConditions().then(data => newAd.setPaintConditions(data));
        fetchColors().then(data => newAd.setColors(data));
        fetchAccidents().then(data => newAd.setAccidents(data));
        fetchDrivenFrom().then(data => newAd.setDrivenFrom(data));
    }, []);

    const selectFiles = e => {
        const selectedFiles = [...e.target.files];
        setFiles(selectedFiles);
        setMainPhotoIndex(null);
    };

    const handleMainPhotoChange = index => {
        setMainPhotoIndex(index);
    };

    const handleMakeClick = (make) => {
        newAd.setSelectedMake(make);
        newAd.setSelectedModel('');
        newAd.setSelectedGeneration('');
        newAd.setSelectedCar('');
    };

    const handleModelClick = (model) => {
        newAd.setSelectedModel(model);
        newAd.setSelectedGeneration('');
        newAd.setSelectedCar('');
    };

    const handleGenerationClick = (generation) => {
        newAd.setSelectedGeneration(generation);
        newAd.setSelectedCar('');
    };

    const handleCarClick = (car) => {
        newAd.setSelectedCar(car);
        console.log(car.id);
        console.log(user.userId);
    };

    const uniqueMakes = [...new Set(newAd.cars.map(car => car.make))];

    const uniqueModels = newAd.selectedMake
        ? [...new Set(newAd.cars.filter(car => car.make === newAd.selectedMake).map(car => car.model))]
        : [];

    const uniqueGenerations = newAd.selectedModel
        ? [...new Set(newAd.cars.filter(car => car.make === newAd.selectedMake && car.model === newAd.selectedModel).map(car => car.generation))]
        : [];

    const filteredCars = newAd.selectedGeneration
        ? newAd.cars.filter(car => car.make === newAd.selectedMake && car.model === newAd.selectedModel && car.generation === newAd.selectedGeneration)
        : [];

    const addAd = () => {
        if (!newAd.selectedMake || !newAd.selectedModel || !newAd.selectedGeneration || !newAd.selectedCar || !description || !yearOfManufacture || !mileage || !price || !newAd.selectedPaintCondition || !newAd.selectedColor || !newAd.selectedAccident || !newAd.selectedDrivenFrom || files.length === 0) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        const formData = new FormData();
        try {
            if (mainPhotoIndex !== null) {
                const mainPhoto = files[mainPhotoIndex];
                files.splice(mainPhotoIndex, 1);
                files.unshift(mainPhoto);
            }

            formData.append('title', `${newAd.selectedMake} ${newAd.selectedModel}`);
            formData.append('description', description);
            formData.append('year_of_manufacture', yearOfManufacture);
            formData.append('mileage', `${mileage}`);
            formData.append('price', `${price}`);
            formData.append('make', `${newAd.selectedMake}`);
            formData.append('model', `${newAd.selectedModel}`);
            formData.append('ConsumerId', user.user.id); 
            formData.append('CarId', newAd.selectedCar.id);
            formData.append('PaintConditionId', newAd.selectedPaintCondition.id);
            formData.append('ColorId', newAd.selectedColor.id);
            formData.append('AccidentId', newAd.selectedAccident.id);
            formData.append('DrivenFromId', newAd.selectedDrivenFrom.id);
            files.forEach((file, index) => {
                formData.append('photos', file);
            });

            createNewAd(formData).then(data => alert(`Оголошення про продаж авто створено`));
            setDescription('');
            setYearOfManufacture('');
            setMileage('');
            setPrice('');
            setFiles([]);
            setMainPhotoIndex(null);
            newAd.setSelectedMake(null);
            newAd.setSelectedModel(null);
            newAd.setSelectedGeneration(null)
            newAd.setSelectedPaintCondition(null);
            newAd.setSelectedColor(null);
            newAd.setSelectedAccident(null);
            newAd.setSelectedDrivenFrom(null);
            navigate(MAIN_ROUTE);  
        } catch (e) {
            alert(e);
        }           
    };

    return (
        <Container className='Container'>
            <Form>
                <h4>Марки Авто</h4>
                <Dropdown className='mt-2 dropDown'>
                    <Dropdown.Toggle>
                        {newAd.selectedMake || "Виберіть марку"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {uniqueMakes.map((make, index) => (
                            <Dropdown.Item 
                                key={index} 
                                onClick={() => handleMakeClick(make)}
                            >
                                {make}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="mt-3">Моделі Авто</h4>
                <Dropdown className='mt-2 dropDown'>
                    <Dropdown.Toggle>
                        {newAd.selectedModel || "Виберіть модель"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {uniqueModels.map((model, index) => (
                            <Dropdown.Item 
                                key={index}
                                onClick={() => handleModelClick(model)}
                            >
                                {model}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {newAd.selectedModel && (
                    <>
                        <h4 className="mt-3">Покоління</h4>
                        <Dropdown className='mt-2 dropDown'>
                            <Dropdown.Toggle>
                                {newAd.selectedGeneration || "Виберіть покоління"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {uniqueGenerations.map((generation, index) => (
                                    <Dropdown.Item 
                                        key={index}
                                        onClick={() => handleGenerationClick(generation)}
                                    >
                                        {generation}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                )}

                {newAd.selectedGeneration && (
                    <>
                        <h4 className="mt-3">Комплектація</h4>
                        <Dropdown className='mt-2 dropDown'>
                            <Dropdown.Toggle>
                                {newAd.selectedCar ? `${newAd.selectedCar.trim} (${newAd.selectedCar.capacity_cm3}, ${newAd.selectedCar.drive_wheels}, ${newAd.selectedCar.transmission})` : "Виберіть комплектацію"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {filteredCars.map((car, index) => (
                                    <Dropdown.Item 
                                        key={index}
                                        onClick={() => handleCarClick(car)}
                                    >
                                        {car.trim} (Коробка передач: {car.transmission}, Об'єм двигуна:{car.capacity_cm3}, Привід: {car.drive_wheels})
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                )}

                <h4 className="mt-3">Введіть опис авто</h4>
                <Form.Control
                    className='mt-3'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder='Опис автомобіля'
                />
                <h4 className="mt-3">Введіть пробіг авто</h4>
                <Form.Control
                    className='mt-3'
                    value={mileage}
                    onChange={e => setMileage(Number(e.target.value))}
                    placeholder='Пробіг автомобіля'
                    type='number'
                />
                <h4 className="mt-3">Введіть рік виготовлення авто</h4>
                <Form.Control
                    className='mt-3'
                    value={yearOfManufacture}
                    onChange={e => setYearOfManufacture(e.target.value)}
                    placeholder='Рік виготовлення'
                />
                <h4 className="mt-3">Введіть ціну авто в USD</h4>
                <Form.Control
                    className='mt-3'
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    placeholder='Ціна автомобіля'
                    type='number'
                />
                <h4 className="mt-3">Оберіть фото авто</h4>
                <Form.Control
                    className='mt-3'
                    type='file'
                    multiple
                    onChange={selectFiles}
                />
                {files.length > 0 && (
                    <div className="mt-3">
                        <h4 className="mt-3">Оберіть головне фото</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {files.map((file, index) => (
                                <div key={index} style={{ margin: '10px' }}>
                                    <Form.Check
                                        type="radio"
                                        label={`Фото ${index + 1}`}
                                        name="mainPhoto"
                                        onChange={() => handleMainPhotoChange(index)}
                                        checked={index === mainPhotoIndex}
                                    />
                                    <img src={URL.createObjectURL(file)} alt={`Фото ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <h4 className="mt-3">Оберіть стан ЛФП</h4>
                <Dropdown className='mt-3 dropDown'>
                    <Dropdown.Toggle>
                        {newAd.selectedPaintCondition?.paint_condition_name || "Оберіть стан ЛКП"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {newAd.paintConditions.map(pC =>
                            <Dropdown.Item 
                                onClick={() => newAd.setSelectedPaintCondition(pC)} 
                                key={pC.id}
                            >
                                {pC.paint_condition_name}
                                <div>{pC.paint_condition_description}</div>
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="mt-3">Оберіть колір</h4>
                <Dropdown className='mt-1 dropDown'>
                    <Dropdown.Toggle>
                        {newAd.selectedColor?.color_name || "Оберіть колір авто"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {newAd.colors.map(color =>
                            <Dropdown.Item onClick={() => newAd.setSelectedColor(color)} key={color.id}>
                                {color.color_name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="mt-3">Участь в ДТП</h4>
                <Dropdown className='mt-3 dropDown'>
                    <Dropdown.Toggle>
                        {newAd.selectedAccident?.accident_name || "Участь в ДТП"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {newAd.accidents.map(accident =>
                            <Dropdown.Item onClick={() => newAd.setSelectedAccident(accident)} key={accident.id}>
                                {accident.accident_name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="mt-3">Куплений в / Пригнаний з</h4>
                <Dropdown className='mt-1 dropDown'>
                    <Dropdown.Toggle>
                        {newAd.selectedDrivenFrom?.country_name || "Пригнаний з"}                       
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {newAd.drivenFrom.map(drivenFrom =>
                            <Dropdown.Item onClick={() => newAd.setSelectedDrivenFrom(drivenFrom)} key={drivenFrom.id}>
                                {drivenFrom.country_name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Button className='mt-3 mb-5 createAdBtn' onClick={addAd}>Створити оголошення</Button>
            </Form>
        </Container>
    );
});

export default CreateAd;
