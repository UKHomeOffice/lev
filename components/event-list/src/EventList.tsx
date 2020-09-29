import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/EventList.scss';

export type EventListProps = StandardProps & {
};

export const EventList: FC<EventListProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('ho-lev-event-list', classBlock, classModifiers, className);

  return (
    <ul {...attrs} className={classes()}>
      {children}
    </ul>
  );
};

export default EventList;
