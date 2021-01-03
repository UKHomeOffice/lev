import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/contributing.md';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>Contributing - LEV</title>
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
export const title = 'Contributing';
