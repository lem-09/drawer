import React from 'react';
import { Button, Flex } from 'antd';
import { HomeOutlined, CloseOutlined } from '@ant-design/icons'; // Importez l'icône de fermeture
import Categorization from './Categorization';
import { FormSchema } from '../App';

type DrawerContentProps = {
    formSchemas: FormSchema[];
    activeFormIndex: number;
    activeCategoryIndexes: number[];
    onCategorySelect: (formIndex: number, categoryIndex: number) => void;
    onHomeClick: () => void;
    onCloseDrawer: () => void; // Ajoutez une prop pour fermer le Drawer
};

const DrawerContent: React.FC<DrawerContentProps> = ({
                                                         formSchemas,
                                                         activeFormIndex,
                                                         activeCategoryIndexes,
                                                         onCategorySelect,
                                                         onHomeClick,
                                                         onCloseDrawer, // Utilisez la nouvelle prop
                                                     }) => {
    return (
        <>
            <Flex justify="space-between" align="center">
                <h4>Menu</h4>
                <Flex gap="small"> {/* Utilisez un Flex pour aligner les boutons */}
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                        onClick={onHomeClick}
                        style={{ backgroundColor: '#3d5b95' }}
                    />
                    <Button
                        type="primary"
                        icon={<CloseOutlined />}
                        onClick={onCloseDrawer} // Ferme le Drawer
                        style={{ backgroundColor: '#3d5b95' }}
                    />
                </Flex>
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