/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides';
import {StyledProgressSteps} from './styled-components';
import type {ProgressStepsPropsT, StepPropsT} from './types';

function ProgressSteps({
  overrides = {},
  current,
  children,
}: ProgressStepsPropsT) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledProgressSteps);
  const numChildren = React.Children.count(children);
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) return;

    return React.cloneElement(
      child,
      ({
        isLast: index === numChildren - 1,
        isCompleted: index < current,
        isActive: index === current,
        step: index + 1,
      }: StepPropsT),
    );
  });

  return <Root {...rootProps}>{modifiedChildren}</Root>;
}

ProgressSteps.defaultProps = {
  current: 0,
};

export default ProgressSteps;
