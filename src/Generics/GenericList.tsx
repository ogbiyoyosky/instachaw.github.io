import * as React from 'react';

export interface GenericListProps<T> {
  /** Items to be members of the list. */
  items: T[];
  /** Callback method to render the items. Allows us delegate rendering for each consumer. */
  itemRenderer: (item: T, index: number) => React.ReactNode;
}

/**
 * Generic class that serves as an abstraction for list item iterators.
 */
export class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  constructor (props:GenericListProps<T>) {
    super(props);
  }

  render () {
    const { items, itemRenderer } = this.props;

    return (items.map(itemRenderer));
  }
}
