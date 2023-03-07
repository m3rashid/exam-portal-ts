import { Modal, ModalFuncProps } from 'antd';

const Alert = (
  s: ModalFuncProps['type'] = 'warning',
  title: string,
  content?: string
) => {
  if (s === 'success') {
    return Modal.success({ title, content });
  } else if (s === 'error') {
    return Modal.error({ title, content });
  } else {
    return Modal.warning({ title, content });
  }
};

export default Alert;
