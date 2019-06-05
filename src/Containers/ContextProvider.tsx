import * as React from 'react';

interface ContextProviderState {
  isMenuOpen?: boolean;
}

interface UpdateStateArg {
  key: keyof ContextProviderState;
  value: any;
}

interface ContextProviderStore {
  state: ContextProviderState;
  update: (arg: UpdateStateArg) => void;
}

interface StateObjectArg {
  [key:string]: any
}


const Context = React.createContext({} as ContextProviderStore); // type assertion on empty object

export class ContextProvider extends React.Component<{}, ContextProviderState> {
  public readonly state = {
    isMenuOpen: false
  };

  private update = ({ key, value }: UpdateStateArg) => {
    const stateObject:StateObjectArg = { [key]: value};

    this.setState(stateObject);
  };

  public render() {
    const store: ContextProviderStore = {
      state: this.state,
      update: this.update
    };

    return (
      <Context.Provider value={store}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;