import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/accessibility-statement.md';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>Accessibility statement - LEV</title>
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
export const title = 'Accessibility Statement';
