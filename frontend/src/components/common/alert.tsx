import { Modal, ModalFuncProps } from 'antd';

const Alert = (
  name: ModalFuncProps['type'] = 'warning',
  title: string,
  content?: string
) => {
  if (name === 'success') {
    return Modal.success({ title, content });
  } else if (name === 'error') {
    return Modal.error({ title, content });
  } else {
    return Modal.warning({ title, content });
  }
};

export default Alert;
