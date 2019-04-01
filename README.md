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

 // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render


## License

MIT © [az](https://github.com/az)
