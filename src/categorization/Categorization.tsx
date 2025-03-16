import React from 'react';
import { List, Typography } from 'antd';

const { Title } = Typography;

type Category = {
    label: string;
    icon: React.ReactNode;
};

type CategorizationProps = {
    title: string;
    categories: Category[];
    activeCategoryIndex: number;
    onCategorySelect: (categoryIndex: number) => void;
};

const Categorization: React.FC<CategorizationProps> = ({ title, categories, activeCategoryIndex, onCategorySelect }) => {
    return (
        <div style={{ marginBottom: 20 }}>
            <Title level={5} style={{ color: '#2d4e98' }}>
                {title}
            </Title>
            <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={(category, categoryIndex) => (
                    <List.Item
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            background: activeCategoryIndex === categoryIndex ? '#e6f4ff' : 'transparent',
                            borderRadius: 8,
                        }}
                        onClick={() => onCategorySelect(categoryIndex)}
                    >
                        <List.Item.Meta avatar={category.icon} title={category.label} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Categorization;