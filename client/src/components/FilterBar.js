import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '..';
import CarSelectionForm from './CarSelection';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'; // Додайте імпорт кнопки

const FilterBar = observer(() => {
    const { ad } = useContext(Context);

    const handleFilterChange = () => {
        ad.setPage(1);
    };

    const handleReset = () => { // Створіть функцію для скидання даних
        ad.setSelectedPaintCondition(null);
        ad.setSelectedColor(null);
        ad.setSelectedAccident(null);
        ad.setSelectedDrivenFrom(null);
        handleFilterChange(); // Додайте оновлення сторінки, якщо потрібно
    };

    return (
        <div>
            <ListGroup>
                <CarSelectionForm></CarSelectionForm>
            </ListGroup>
            <ListGroup>
                <h4 className="mt-3">Оберіть стан ЛКП</h4>
                {ad.paintConditions.map(paintCondition => 
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={paintCondition.id === ad.selectedPaintCondition?.id}
                        onClick={() => {
                            ad.setSelectedPaintCondition(paintCondition);
                            handleFilterChange();
                        }}
                        key={paintCondition.id}
                    >
                        {paintCondition.paint_condition_name}
                        <div className='mt-2'>
                            {paintCondition.paint_condition_description}
                        </div>    
                    </ListGroup.Item>
                )}
            </ListGroup>
            <ListGroup>
                <h4 className="mt-3">Оберіть колір</h4>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {ad.selectedColor?.color_name || "Оберіть колір авто"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {ad.colors.map(color =>
                            <Dropdown.Item onClick={() => {
                                ad.setSelectedColor(color);
                                handleFilterChange();
                            }} key={color.id}>{color.color_name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
            <ListGroup>
                <h4 className="mt-3">Участь у ДТП</h4>
                {ad.accidents.map(accident => 
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={accident.id === ad.selectedAccident?.id}
                        onClick={() => {
                            ad.setSelectedAccident(accident);
                            handleFilterChange();
                        }}
                        key={accident.id}
                    >
                        {accident.accident_name}
                    </ListGroup.Item>
                )}
            </ListGroup>
            <ListGroup>
                <h4 className="mt-3">Куплений в / Пригнаний з</h4>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {ad.selectedDrivenFrom?.country_name || "Пригнаний з"}                       
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {ad.drivenFrom.map(drivenFrom =>
                            <Dropdown.Item onClick={() => {
                                ad.setSelectedDrivenFrom(drivenFrom);
                                handleFilterChange();
                            }} key={drivenFrom.id}>{drivenFrom.country_name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
            <Button variant="secondary" onClick={handleReset}>Скинути</Button> {/* Додайте кнопку скидання */}
        </div>    
    );
});

export default FilterBar;
