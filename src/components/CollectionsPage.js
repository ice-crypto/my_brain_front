import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Button, Modal, Form, Input, Radio } from 'antd';
import CollectionCreateForm from './tree_modal';

const CollectionsPage = ({taget}) => {
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={this.props.visible}
        onCreate={this.props.onCreate}
        onCancel={this.props.onCancel}
        target={this.props.target}
      />
    </div>
  );
};

export default CollectionCreateForm
