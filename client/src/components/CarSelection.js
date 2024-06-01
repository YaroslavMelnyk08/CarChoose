import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/FilterBar.css';

const CarSelection = observer(() => {
    const { ad } = useContext(Context);

    // Отримання унікальних марок
    const uniqueMakes = [...new Set(ad.cars.map(car => car.make))];

    const handleMakeClick = (make) => {
        ad.setSelectedMake(make);
        ad.setSelectedModel('');
    };

    const handleModelClick = (model) => {
        ad.setSelectedModel(model);
    };

    const uniqueModels = ad.selectedMake
        ? [...new Set(ad.cars.filter(car => car.make === ad.selectedMake).map(car => car.model))]
        : [];

    return (
        <div>
            <h4>Марки Авто</h4>
            <Dropdown className='mt-2 dropDown'>
                <Dropdown.Toggle>
                    {ad.selectedMake || "Виберіть марку"}
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
                    {ad.selectedModel || "Виберіть модель"}
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
        </div>
    );
});

export default CarSelection;