import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../accessibility-statement.md';

export const title = 'Accessibility Statement';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - LEV</title>
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
