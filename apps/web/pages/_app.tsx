import { PageContainer } from 'ui';
import '../css-reset.css';
import { GameStateProvider } from 'state-manager';

export const App = (props: { Component: any; pageProps: any }) => {
    const { Component, pageProps } = props;
    return (
        <PageContainer>
            <Component {...pageProps} />
        </PageContainer>
    );
};

export default App;
