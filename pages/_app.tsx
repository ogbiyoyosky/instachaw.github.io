'use strict';

import App, { Container } from 'next/app';
import * as React from 'react';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import store from '@Store';
import { AppContainer } from '@Containers';
import { IApp } from '@Interfaces';

class MyApp extends App<IApp.IProps> {
    static async getInitialProps(props: any) {
        let pageProps = {};

        if (props.Component.getInitialProps) {
            pageProps = await props.Component.getInitialProps(props.ctx);
        }

        return { pageProps };
    }


    render(): JSX.Element {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <AppContainer>
                        <Component {...pageProps} />
                    </AppContainer>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(store)(MyApp);