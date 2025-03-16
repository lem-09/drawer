import React, { useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Layout, Button, Drawer, Flex, Grid } from 'antd';
import { UserOutlined, TeamOutlined, PlusOutlined, EnvironmentOutlined, LaptopOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

import { schema1Basic, schema1Address, schema1Additional, uischema1Basic, uischema1Additional, uischema1Address, initialData1 } from './schemas/schema1';
import { schema2JobDetails, schema2Manager, uischema2JobDetails, uischema2Manager, initialData2 } from './schemas/schema2';
import { UISchemaElement } from '@jsonforms/core';

import FormRenderer from './categorization/FormRenderer';
import HomePage from './categorization/HomePage';
import DrawerContent from './categorization/DrawerContent';
import Title from "antd/lib/typography/Title";

const { Content } = Layout;
const { useBreakpoint } = Grid;

type FormCategory = {
    label: string;
    schema: object;
    uiSchema: UISchemaElement;
    initialData: any;
    icon: React.ReactNode;
};
export type FormSchema = {
    title: string;
    categories: FormCategory[];
};

const formSchemas: FormSchema[] = [
    {
        title: 'Personal information',
        categories: [
            { label: 'Basic', schema: schema1Basic, uiSchema: uischema1Basic, initialData: initialData1, icon: <UserOutlined /> },
            { label: 'Address', schema: schema1Address, uiSchema: uischema1Address, initialData: initialData1, icon: <EnvironmentOutlined /> },
            { label: 'Additional', schema: schema1Additional, uiSchema: uischema1Additional, initialData: initialData1, icon: <PlusOutlined /> },
        ],
    },
    {
        title: 'Professional information',
        categories: [
            { label: 'Job Details', schema: schema2JobDetails, uiSchema: uischema2JobDetails, initialData: initialData2, icon: <LaptopOutlined /> },
            { label: 'Management', schema: schema2Manager, uiSchema: uischema2Manager, initialData: initialData2, icon: <TeamOutlined /> },
        ],
    },
];

const App: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [activeCategoryIndexes, setActiveCategoryIndexes] = useState<number[]>(new Array(formSchemas.length).fill(0));
    const [showIntro, setShowIntro] = useState(true);

    const [formData, setFormData] = useState(
        formSchemas.map((form) => form.categories.map((category) => ({ ...category.initialData })))
    );

    const handleChange = (newData: any) => {
        const updatedData = [...formData];
        updatedData[activeFormIndex][activeCategoryIndexes[activeFormIndex]] = newData;
        setFormData(updatedData);
    };

    const handleCategorySelect = (formIndex: number, categoryIndex: number) => {
        setShowIntro(false);
        setActiveFormIndex(formIndex);
        const newCategoryIndexes = [...activeCategoryIndexes];
        newCategoryIndexes[formIndex] = categoryIndex;
        setActiveCategoryIndexes(newCategoryIndexes);
    };

    const activeForm = formSchemas[activeFormIndex];
    const activeCategory = activeForm.categories[activeCategoryIndexes[activeFormIndex]];

    return (
        <ProLayout
            title="My Application"
            layout="top"
            siderWidth={0}
            contentStyle={{ padding: 20, transition: 'margin-left 0.3s ease' }}
            menuRender={false}
            headerContentRender={() => (
                <Flex
                    align={isMobile ? 'start' : 'center'}
                    style={isMobile ? { width: '100%', justifyContent: 'right' } : { width: '100%', justifyContent: 'center' }}
                >
                    {!showIntro ? (
                        <Title level={isMobile ? 5 : 4} style={{ margin: 0, color: '#2d4e98' }}>
                            {activeForm.title}
                        </Title>
                    ) : (
                        <Title level={isMobile ? 5 : 4} style={{ margin: 0, color: '#2d4e98' }}>
                            Home
                        </Title>
                    )}
                </Flex>
            )}
        >
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                <Drawer
                    title={
                        <DrawerContent
                            formSchemas={formSchemas}
                            activeFormIndex={activeFormIndex}
                            activeCategoryIndexes={activeCategoryIndexes}
                            onCategorySelect={handleCategorySelect}
                            onHomeClick={() => {
                                setShowIntro(true);
                                setDrawerOpen(false);
                            }}
                            onCloseDrawer={() => setDrawerOpen(false)}
                        />
                    }
                    placement="left"
                    mask={false}
                    closable={false}
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    width={isMobile ? '40vw' : 320}
                    style={{ backgroundColor: '#d9deef' }}
                />

                <Content
                    style={{
                        flex: 1,
                        marginLeft: drawerOpen ? (isMobile ? '40vw' : '320px') : 0,
                        width: isMobile ? `calc(100% - ${drawerOpen ? 40 : 0}vw)` : `calc(100% - ${drawerOpen ? 320 : 0}px)`,
                        transition: 'all 0.3s ease',
                    }}
                >

                    {!drawerOpen && !showIntro && (
                        <Button type="primary" onClick={() => setDrawerOpen(true)} style={{ marginBottom: 20, backgroundColor: '#3d5b95' }}>
                            Open drawer
                        </Button>
                    )}

                    {showIntro ? (
                        <HomePage onGetStarted={() => setDrawerOpen(true)} />
                    ) : (
                        <>
                            <Title level={isMobile ? 4 : 1} style={{ color: '#2d4e98' }}>{activeCategory.label}</Title>
                            <FormRenderer
                                schema={activeCategory.schema}
                                uiSchema={activeCategory.uiSchema}
                                data={formData[activeFormIndex][activeCategoryIndexes[activeFormIndex]]}
                                onChange={handleChange}
                            />
                        </>
                    )}
                </Content>
            </Layout>
        </ProLayout>
    );
};

export default App;