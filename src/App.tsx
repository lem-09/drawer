import React, { useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Layout, Button, Drawer, List, Typography } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

import { schema1Basic, schema1Address, schema1Additional, uischema1Basic, uischema1Additional, uischema1Address } from './schemas/schema1';
import { schema2JobDetails, schema2Manager, uischema2JobDetails, uischema2Manager } from './schemas/schema2';
import {UISchemaElement} from "@jsonforms/core";

const { Content } = Layout;
const { Title } = Typography;

type FormCategory = {
    label: string;
    schema: object;
    uischema: UISchemaElement;
};
type FormSchema = {
    title: string;
    categories: FormCategory[];
};



const formSchemas: FormSchema[] = [
    {
        title: 'Personal information',
        categories: [
            { label: 'Basic', schema: schema1Basic, uischema: uischema1Basic },
            { label: 'Address', schema: schema1Address, uischema: uischema1Address },
            { label: 'Additional', schema: schema1Additional, uischema: uischema1Additional },
        ],
    },
    {
        title: 'Job',
        categories: [
            { label: 'Job Details', schema: schema2JobDetails, uischema: uischema2JobDetails },
            { label: 'Management', schema: schema2Manager, uischema: uischema2Manager },
        ],
    },
];


const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [activeCategoryIndexes, setActiveCategoryIndexes] = useState<number[]>(new Array(formSchemas.length).fill(0));

    const handleCategorySelect = (formIndex: number, categoryIndex: number) => {
        setActiveFormIndex(formIndex);
        const newCategoryIndexes = [...activeCategoryIndexes];
        newCategoryIndexes[formIndex] = categoryIndex;
        setActiveCategoryIndexes(newCategoryIndexes);
        setDrawerOpen(false);
    };

    const activeForm = formSchemas[activeFormIndex];
    const activeCategory = activeForm.categories[activeCategoryIndexes[activeFormIndex]];

    return (
        <ProLayout
            title="My Application"
            layout="top"
            siderWidth={0}
            contentStyle={{ padding: 20, transition: 'margin-left 0.3s ease' }}
        >
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                <Drawer
                    title="My drawer"
                    placement="left"
                    mask={false}
                    closable
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    width={320}
                    style={{ backgroundColor: '#c9e9ea' }}
                >
                    {formSchemas.map((form, formIndex) => (
                        <div key={formIndex} style={{ marginBottom: 20 }}>
                            <Title level={4} style={{ color: '#1677ff' }}>
                                {form.title}
                            </Title>

                            <List
                                itemLayout="horizontal"
                                dataSource={form.categories}
                                renderItem={(category, categoryIndex) => (
                                    <List.Item
                                        style={{
                                            padding: '8px 16px',
                                            cursor: 'pointer',
                                            background:
                                                activeFormIndex === formIndex && activeCategoryIndexes[formIndex] === categoryIndex
                                                    ? '#e6f4ff'
                                                    : 'transparent',
                                            borderRadius: 8,
                                        }}
                                        onClick={() => handleCategorySelect(formIndex, categoryIndex)}
                                    >
                                        <List.Item.Meta
                                            avatar={<AppstoreOutlined style={{ fontSize: '18px', color: '#1677ff' }} />}
                                            title={category.label}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    ))}
                </Drawer>

                <Content
                    style={{
                        flex: 1,
                        marginLeft: drawerOpen ? 320 : 0,
                        width: `calc(100% - ${drawerOpen ? 320 : 0}px)`,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Button type="primary" onClick={() => setDrawerOpen(true)} style={{ marginBottom: 20 }}>
                        Open drawer
                    </Button>

                    <JsonForms
                        schema={activeCategory.schema}
                        uischema={activeCategory.uischema}
                        data={{}}
                        renderers={materialRenderers}
                    />
                </Content>
            </Layout>
        </ProLayout>
    );
};

export default App;
