import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '..';
import CarSelectionForm from './CarSelection';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import '../styles/FilterBar.css'

const FilterBar = observer(() => {
    const { ad } = useContext(Context);

    const handleFilterChange = () => {
        ad.setPage(1);
    };

    const handleReset = () => {
        ad.setSelectedMake(null);
        ad.setSelectedModel(null);
        ad.setSelectedCar(null)
        ad.setSelectedPaintCondition(null);
        ad.setSelectedColor(null);
        ad.setSelectedAccident(null);
        ad.setSelectedDrivenFrom(null);
        handleFilterChange();
    };

    return (
        <div>
            <ListGroup className='listGroupItem'>
                <CarSelectionForm></CarSelectionForm>
            </ListGroup>
            <ListGroup className='listGroupItem mt-3'>
                <h4>Оберіть стан ЛФП</h4>
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
                        <div className='listGroupItemTitle'>
                            {paintCondition.paint_condition_name}
                        </div>
                        <div className='mt-1'>
                            Опис: {paintCondition.paint_condition_description}
                        </div>    
                    </ListGroup.Item>
                )}
            </ListGroup>
            <ListGroup className='listGroupItem mt-3'>
                <h4>Оберіть колір</h4>
                <Dropdown className='mt-1 dropDown'>
                    <Dropdown.Toggle>
                        {ad.selectedColor?.color_name || "Оберіть колір авто"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {ad.colors.map(color =>
                            <Dropdown.Item onClick={() => {
                                ad.setSelectedColor(color);
                                handleFilterChange();
                            }} key={color.id}>{color.color_name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
            <ListGroup className='listGroupItem mt-3'>
                <h4>Участь у ДТП</h4>
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
            <ListGroup className='listGroupItem mt-3'>
                <h4>Куплений в / Пригнаний з</h4>
                <Dropdown className='mt-1  dropDown'>
                    <Dropdown.Toggle className='dropDownStyle'>
                        {ad.selectedDrivenFrom?.country_name || "Пригнаний з"}                       
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {ad.drivenFrom.map(drivenFrom =>
                            <Dropdown.Item onClick={() => {
                                ad.setSelectedDrivenFrom(drivenFrom);
                                handleFilterChange();
                            }} key={drivenFrom.id}>{drivenFrom.country_name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
            <Button className='filterBarBtn mt-3' onClick={handleReset}>Скинути</Button>
        </div>    
    );
});

export default FilterBar;
