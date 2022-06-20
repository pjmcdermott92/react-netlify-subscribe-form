import TabGroup, { Tab } from './components/TabGroup/TabGroup';
import { SubscribeForm, SearchForm, UnsubscribeForm } from './components';
import './styles/root.scss';

const App = () => {

    return (
        <TabGroup>
            <Tab title='Subscribe'>
                <SubscribeForm />
            </Tab>
            <Tab title='Find Subscriber'>
                <SearchForm />
            </Tab>
            <Tab title='Unsubscribe'>
                <UnsubscribeForm />
            </Tab>
        </TabGroup>
    )
}

export default App;
