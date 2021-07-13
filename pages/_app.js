import React from 'react'

import { reduxWrapper } from '../src/lib/redux'
import { NextApp } from '../src/lib/next';

export default reduxWrapper.withRedux(NextApp)