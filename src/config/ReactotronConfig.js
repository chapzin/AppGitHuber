import Reactotron from 'reactotron-react-native';

Reactotron.configure({ host: '192.168.0.234' })
  .useReactNative()
  .connect();
