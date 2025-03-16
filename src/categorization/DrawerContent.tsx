import React from 'react';
import { Button, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Categorization from './Categorization';
import {FormSchema} from '../App';

type DrawerContentProps = {
    formSchemas: FormSchema[];
    activeFormIndex: number;
    activeCategoryIndexes: number[];
    onCategorySelect: (formIndex: number, categoryIndex: number) => void;
    onHomeClick: () => void;
};

const DrawerContent: React.FC<DrawerContentProps> = ({ formSchemas, activeFormIndex, activeCategoryIndexes, onCategorySelect, onHomeClick }) => {
    return (
        <>
            <Flex justify="space-between" align="center">
                <h4>Menu</h4>
                <Button
                    type="primary"
                    icon={<HomeOutlined />}
                    onClick={onHomeClick}
                    style={{ backgroundColor: '#3d5b95' }}
                />
            </Flex>
            {formSchemas.map((form, formIndex) => (
                <Categorization
                    key={formIndex}
                    title={form.title}
                    categories={form.categories}
                    activeCategoryIndex={activeCategoryIndexes[formIndex]}
                    onCategorySelect={(categoryIndex) => onCategorySelect(formIndex, categoryIndex)}
                />
            ))}
        </>
    );
};

export default DrawerContent;