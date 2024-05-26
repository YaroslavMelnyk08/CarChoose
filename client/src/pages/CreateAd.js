import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Context } from '..';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchAccidents, fetchCars, fetchColors, fetchDrivenFrom, fetchPaintConditions, createNewAd } from '../http/adAPI';
import { Button, DropdownButton } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const CreateAd = observer(() => {
    const { newAd, user } = useContext(Context);
    const [description, setDescription] = useState('');
    const [yearOfManufacture, setYearOfManufacture] = useState('');
    const [mileage, setMileage] = useState(0);
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchCars().then(data => newAd.setCars(data));
        fetchPaintConditions().then(data => newAd.setPaintConditions(data));
        fetchColors().then(data => newAd.setColors(data));
        fetchAccidents().then(data => newAd.setAccidents(data));
        fetchDrivenFrom().then(data => newAd.setDrivenFrom(data));
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const uniqueMakes = [...new Set(newAd.cars.map(car => car.make))];

    const handleMakeClick = (make) => {
        newAd.setSelectedMake(make);
        newAd.setSelectedModel('');
    };

    const handleModelClick = (model) => {
        newAd.setSelectedModel(model);
        const selectedCar = newAd.cars.find(car => car.make === newAd.selectedMake && car.model === model);
        newAd.setSelectedCar(selectedCar);
        console.log(user.userId)
    };

    const uniqueModels = newAd.selectedMake
        ? [...new Set(newAd.cars.filter(car => car.make === newAd.selectedMake).map(car => car.model))]
        : []
    ;

    const addAd = () => {
        if (!newAd.selectedMake || !newAd.selectedModel || !description || !yearOfManufacture || !mileage || !price || !newAd.selectedCar || !newAd.selectedPaintCondition || !newAd.selectedColor || !newAd.selectedAccident || !newAd.selectedDrivenFrom || !file) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        const formData = new FormData()
        try {
            formData.append('title', `${newAd.selectedMake} ${newAd.selectedModel}`);
            formData.append('description', description);
            formData.append('year_of_manufacture', yearOfManufacture);
            formData.append('mileage', `${mileage}`);
            formData.append('price', `${price}`);
            formData.append('ConsumerId', user.user.id); 
            formData.append('CarId', newAd.selectedCar.id);
            formData.append('PaintConditionId', newAd.selectedPaintCondition.id);
            formData.append('ColorId', newAd.selectedColor.id);
            formData.append('AccidentId', newAd.selectedAccident.id);
            formData.append('DrivenFromId', newAd.selectedDrivenFrom.id);
            formData.append('photo', file);
            
            createNewAd(formData).then(data => alert(`Оголошення про продаж ${newAd.selectedMake} ${newAd.selectedModel} створено`))
            setDescription('');
            setYearOfManufacture('');
            setMileage(0);
            setPrice(0);
            setFile(null);
        } catch(e) {
            alert(e);
        }   
    }

    return (
        <Container>
            <Form>
                <h4>Марки Авто</h4>
                <DropdownButton id="dropdown-make" title={newAd.selectedMake || "Виберіть марку"}>
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
                </DropdownButton>

                <h4 className="mt-3">Моделі Авто</h4>
                <DropdownButton id="dropdown-model" title={newAd.selectedModel || "Виберіть модель"}>
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
                </DropdownButton>
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
                <h4 className="mt-3">Введіть ціну авто</h4>
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
                    placeholder='Оберіть фото'
                    type='file'
                    onChange={selectFile}
                />
                <h4 className="mt-3">Оберіть стан ЛКП</h4>
                <DropdownButton className='mt-3' id="dropdown-paintCondition" title={newAd.selectedPaintCondition.paint_condition_name || "Оберіть стан ЛКП"}>
                    <Dropdown.Menu>
                        {newAd.paintConditions.map(pC =>
                            <Dropdown.Item onClick={() => newAd.setSelectedPaintCondition(pC)} key={pC.id}>
                                {pC.paint_condition_name}
                                <div>{pC.paint_condition_description}</div>
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </DropdownButton>
                <h4 className="mt-3">Оберіть колір</h4>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {newAd.selectedColor.color_name || "Оберіть колір авто"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {newAd.colors.map(color =>
                            <Dropdown.Item onClick={() => newAd.setSelectedColor(color)} key={color.id}>
                                {color.color_name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="mt-3">Участь в ДТП</h4>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {newAd.selectedAccident.accident_name || "Участь в ДТП"}
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
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {newAd.selectedDrivenFrom.country_name || "Пригнаний з"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {newAd.drivenFrom.map(drivenFrom =>
                            <Dropdown.Item onClick={() => newAd.setSelectedDrivenFrom(drivenFrom)} key={drivenFrom.id}>
                                {drivenFrom.country_name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Button className='mt-3 mb-5' onClick={addAd}>Створити оголошення</Button>
            </Form>
        </Container>
    );
});

export default CreateAd;