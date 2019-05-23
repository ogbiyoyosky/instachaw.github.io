import Document, { Head, Main, NextScript } from 'next/document'

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: { renderPage: any }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App:any) => (props:any) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
		const styleTags = sheet.getStyleElement();
		
    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
	}
	
	render() {
		const { styleTags } = this.props as any;
		
		return (
			<html>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
					<meta charSet="utf-8" />
					<link href="/static/css/reset.css" rel="stylesheet" />
					{styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}