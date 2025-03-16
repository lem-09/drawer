import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

type IntroProps = {
    onGetStarted: () => void;
};

const HomePage: React.FC<IntroProps> = ({ onGetStarted }) => {
    return (
        <div style={{ textAlign: 'center', paddingTop: '10%' }}>
            <Title level={1} style={{ color: '#2d4e98' }}>Welcome to the Management Interface</Title>
            <h2>Manage your personal and professional information easily!</h2>
            <Button type="primary" size="large" onClick={onGetStarted} style={{ backgroundColor: '#3d5b95', marginTop: '50px' }}>
                Get Started
            </Button>
        </div>
    );
};

export default HomePage;