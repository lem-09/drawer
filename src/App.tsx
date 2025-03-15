import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import ProLayout from '@ant-design/pro-layout';
import { Drawer, Layout, Button } from 'antd';
import 'antd/dist/reset.css';

import { schema1, uischema1, initialData1 } from "./schemas/schema1";
import { schema2, uischema2, initialData2 } from "./schemas/schema2";

const { Content } = Layout;

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false); // Drawer fermé par défaut

    return (
        <ProLayout
            title="Mon Application"
            layout="top"

            siderWidth={0}
            contentStyle={{ padding: 20, transition: 'margin-left 0.3s ease' }}
        >
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>

                <Drawer
                    title="Navigation"
                    placement="left"
                    closable
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    width={250}
                >
                    <p onClick={() => setDrawerOpen(false)}>Formulaire 1</p>
                    <p onClick={() => setDrawerOpen(false)}>Formulaire 2</p>
                </Drawer>

                <Content style={{
                    flex: 1,
                    marginLeft: drawerOpen ? 250 : 0,
                    transition: 'margin-left 0.3s ease',
                }}>

                    <Button type="primary" onClick={() => setDrawerOpen(true)} style={{ marginBottom: 20 }}>
                        Ouvrir le menu
                    </Button>

                    <JsonForms
                        schema={schema1}
                        uischema={uischema1}
                        data={initialData1}
                        renderers={materialRenderers}
                    />
                    <JsonForms
                        schema={schema2}
                        uischema={uischema2}
                        data={initialData2}
                        renderers={materialRenderers}
                    />
                </Content>

            </Layout>
        </ProLayout>
    );
};

export default App;
