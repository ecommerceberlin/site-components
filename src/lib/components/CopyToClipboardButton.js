import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from './MyButton';


const CopyToClipboardButton = ({text, label = 'common.copy_to_clipboard', ...buttonProps}) => (
<CopyToClipboard text={text} onCopy={() => true}>
    <Button label={label} {...buttonProps} />
</CopyToClipboard>);

export default CopyToClipboardButton