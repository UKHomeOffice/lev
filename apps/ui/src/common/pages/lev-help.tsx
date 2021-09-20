import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../lev-help.md';

export const title = 'Get help with LEV';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - LEV</title>
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
