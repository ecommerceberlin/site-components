# eventjuicer-site-components

> next.js site components

## Install

```bash
npm install --save eventjuicer-site-components
```

## Usage

```jsx
import React, { Component } from 'react'

import {
    connect,
    MyHead,
    LayoutMain,
    Widget1, 
    Widget2
} from 'eventjuicer-site-components'

class Page extends React.Component {
  static async getInitialProps({
    err,
    req,
    res,
    pathname,
    query,
    asPath,
    isServer,
    store
  }) {
    return {};
  }

  render() {

    return (
      <LayoutMain>
        <MyHead />
        <Widget1 />
      </LayoutMain>
    );
  }
}

export default connect()(Page);

```

## License

MIT © [az](https://github.com/az)
