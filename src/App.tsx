import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { Drawer, Button } from 'antd';
import { ProLayout } from '@ant-design/pro-components';
import 'antd/dist/reset.css';

import { schema1, uischema1, initialData1 } from "./schemas/schema1";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
      <div style={{ padding: '20px' }}>
        <Button type="primary" onClick={toggleDrawer}>Ouvrir le menu</Button>

        <Drawer title="Navigation" placement="left" onClose={toggleDrawer} open={open}>
          <p>Formulaire 1</p>
        </Drawer>

        <JsonForms
            schema={schema1}
            uischema={uischema1}
            data={initialData1}
            renderers={materialRenderers}
        />
      </div>
  );
};
export default App;
