import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
        const selectedCar = ad.cars.find(car => car.make === ad.selectedMake && car.model === model);
        ad.setSelectedCar(selectedCar);
    };

    const uniqueModels = ad.selectedMake
        ? [...new Set(ad.cars.filter(car => car.make === ad.selectedMake).map(car => car.model))]
        : []
    ;

    return (
        <div>
            <h4>Марки Авто</h4>
                <DropdownButton id="dropdown-make" title={ad.selectedMake || "Виберіть марку"}>
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
                <DropdownButton id="dropdown-model" title={ad.selectedModel || "Виберіть модель"}>
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
        </div>
    );
});

export default CarSelection;